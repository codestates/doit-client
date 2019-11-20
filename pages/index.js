import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Input, Popconfirm, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import './index.css';

import {
  ADD_SECOND,
  PAUSE_TIMER,
  RESUME_TIMER,
  RESET_TIMER,
  SET_TIMER,
  START_TIMER_AND_TODO_CREATE_REQUEST,
  TODO_COMPLETE_REQUEST,
  TODO_COMPLETE_CLEANUP,
} from '../reducers/timer';

const alertMessage = {
  complete: `Todo를 모두 완료하셨나요? Done의 내용을 적어주세요. 내용이 없을 경우 'OK'만 기록됩니다. 이대로 저장하시겠어요?`,
  reset: '타이머와 Todo가 모두 초기화 됩니다. 진행할까요?',
  timerEnd: '시간이 종료되었습니다. 계획한 일을 어떻게 되었나요? ​Done 항목에 한 일, 다 못한 일, 간단한 반성 등을 적어 주세요.'
}

const Home = () => {
  const { TextArea } = Input;
  const [todoContent, setTodoContent] = useState('');
  const [doneContent, setDoneContent] = useState('');
  const {
    totalTime,
    elapsedTime,
    isLoading,
    isStarted,
    isRunning,
    todoId,
    timelineId,
    isSavingTodo,
    isSaveTodoSuccess,
  } = useSelector((state) => state.timer);
  const [timer, setTimer] = useState('');
  const dispatch = useDispatch();

  const timeFormat = (totalTime) => {
    const min = String(Math.floor(totalTime / 60)).padStart(2, 0);
    const sec = String(totalTime % 60).padStart(2, 0);
    return {
      total: `${min}:${sec}`,
      minutes: min,
      seconds: sec,
    };
  };

  const verifyContent = (content) => {
    const verified = content && content.trim();
    return verified && verified.length > 0 ? verified : null;
  };

  const onStart = useCallback(() => {
    const verified = verifyContent(todoContent);
    if (!verified) {
      return message.error('Todo에 할 일을 적어주세요.');
    }
    dispatch({
      type: START_TIMER_AND_TODO_CREATE_REQUEST,
      data: {
        todoContent: verified,
        duration: timeFormat(totalTime).total,
        startedAt: moment().local().format('YYYY-MM-DD HH:mm:ss'),
      },
    });
  }, [todoContent]);

  const onPause = useCallback(() => {
    dispatch({
      type: PAUSE_TIMER,
    });
  }, []);

  const onResume = useCallback(() => {
    dispatch({
      type: RESUME_TIMER,
    });
  }, []);

  const onComplete = useCallback(() => {
    dispatch({
      type: PAUSE_TIMER,
    });
  }, []);

  const onConfirmComplete = useCallback(() => {
    const verified = verifyContent(doneContent);
    dispatch({
      type: TODO_COMPLETE_REQUEST,
      data: {
        doneContent: verified || 'OK',
        todoId,
        timelineId,
        endedAt: moment().local().format('YYYY-MM-DD HH:mm:ss'),
      },
    });
    setTodoContent('');
    setDoneContent('');
  }, [doneContent, todoId, timelineId]);

  const onCancelComplete = useCallback(() => {
    message.success('취소했습니다.');
  }, []);

  const onReset = useCallback(() => {
    dispatch({
      type: PAUSE_TIMER,
    });
  }, []);

  const onConfirmReset = useCallback(() => {
    dispatch({
      type: RESET_TIMER,
      data: {
        todoId,
      },
    });
    setTodoContent('');
    setDoneContent('');
  }, [todoId]);

  const onCancelReset = useCallback(() => {
    message.success('취소했습니다.');
  }, []);

  const onClickTimeSetting = useCallback(
    (time) => () => {
      dispatch({
        type: SET_TIMER,
        time: time * 60,
      });
    },
    [],
  );

  const onChangeTodoContent = useCallback((e) => {
    setTodoContent(e.target.value);
  }, []);

  const onChangeDoneContent = useCallback((e) => {
    setDoneContent(e.target.value);
  }, []);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        dispatch({
          type: ADD_SECOND,
        });
      }, 1000);
      setTimer(interval);
    } else {
      clearInterval(timer);
      if (totalTime === elapsedTime) {
        alert(alertMessage.timerEnd);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (!isSavingTodo && isSaveTodoSuccess) {
      message.success(
        '수고하셨습니다! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ) 조금 쉬시고 다시 시작하세요~',
      );
      dispatch({
        type: TODO_COMPLETE_CLEANUP,
      });
    }
  }, [isSavingTodo === false, isSaveTodoSuccess === true]);

  return (
    <div>
      <div style={{ padding: '10px' }}>
        {/* <Button key="s1" type="dashed" onClick={onClickTimeSetting(0.1)} disabled={isStarted}>
          6s
        </Button> */}
        <Button key="m25" type="dashed" onClick={onClickTimeSetting(25)} disabled={isStarted}>
          25
        </Button>
        <Button key="m45" type="dashed" onClick={onClickTimeSetting(45)} disabled={isStarted}>
          45
        </Button>
        <Button key="m60" type="dashed" onClick={onClickTimeSetting(60)} disabled={isStarted}>
          60
        </Button>
      </div>
      <div style={{ fontSize: '80px', padding: '10px' }}>
        <div>{timeFormat(totalTime - elapsedTime).total}</div>
      </div>
      <div>
        <Card type="inner" title="Todo" style={{ width: '80%' }}>
          <TextArea
            value={todoContent}
            onChange={onChangeTodoContent}
            placeholder="할 일을 적어주세요."
            autoSize={{ minRows: 2 }}
            disabled={isStarted}
          />
        </Card>
        <Card style={{ marginTop: 16, width: '80%' }} type="inner" title="Done">
          <TextArea
            value={doneContent}
            onChange={onChangeDoneContent}
            placeholder="한 일을 적어주세요."
            autoSize={{ minRows: 2 }}
            disabled={!isStarted || isRunning}
          />
        </Card>
        {!isStarted ? (
          // start button을 클릭하면
          // isLoading false -> true
          // isStarted: false
          // isRunning: false
          // start request -> success
          // isLoading true -> false
          // isStarted: true
          // isRunning: true
          <Button
            type="primary"
            onClick={onStart}
            loading={isLoading}
            style={{ width: '70%' }}
          >
            Start
          </Button>
        ) : (
          <span>
            {isRunning ? (
              <Button
                type="primary"
                ghost
                onClick={onPause}
                style={{ width: '35%' }}
              >
                Pause
              </Button>
            ) : (
              <Button
                type="primary"
                ghost
                onClick={onResume}
                style={{ width: '35%' }}
              >
                Resume
              </Button>
            )}
            <Popconfirm
              title={alertMessage.complete}
              onConfirm={onConfirmComplete}
              onCancel={onCancelComplete}
              okText="Yes"
              cancelText="No"
            >
              <Button
                onClick={onComplete}
                loading={isSavingTodo}
                style={{ width: '35%' }}
              >
                Complete!
              </Button>
            </Popconfirm>
          </span>
        )}
        <Popconfirm
              title={alertMessage.reset}
              onConfirm={onConfirmReset}
              onCancel={onCancelReset}
              okText="Yes"
              cancelText="No"
            >
          <Button
            type="danger"
            onClick={onReset}
            style={{ marginTop: '16px', width: '10%' }}
          >
            Reset
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default Home;
