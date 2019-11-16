import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Input, Popconfirm, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

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

const messageComplete = `Todo를 모두 완료하셨나요?\n
Done의 내용을 적어주세요.\n
내용이 없을 경우 'OK'만 기록됩니다.\n
이대로 저장하시겠어요?`;

const Home = () => {
  const { TextArea } = Input;
  const [todoContent, setTodoContent] = useState('');
  const [doneContent, setDoneContent] = useState('');
  const {
    totalTime,
    elapsedTime,
    isStarting,
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
        startedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
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
        endedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
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
      type: RESET_TIMER,
    });
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
        <Button key="s1" type="dashed" onClick={onClickTimeSetting(0.1)}>
          6s
        </Button>
        <Button key="m25" type="dashed" onClick={onClickTimeSetting(25)}>
          25
        </Button>
        <Button key="m45" type="dashed" onClick={onClickTimeSetting(45)}>
          45
        </Button>
        <Button key="m60" type="dashed" onClick={onClickTimeSetting(60)}>
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
          />
        </Card>
        <Card style={{ marginTop: 16, width: '80%' }} type="inner" title="Done">
          <TextArea
            value={doneContent}
            onChange={onChangeDoneContent}
            placeholder="한 일을 적어주세요."
            autoSize={{ minRows: 2 }}
          />
        </Card>
        {!isStarted ? (
          // start button을 클릭하면
          // isStarting false -> true
          // isStarted: false
          // isRunning: false
          // start request -> success
          // isStarting true -> false
          // isStarted: true
          // isRunning: true
          <Button
            type="primary"
            onClick={onStart}
            loading={isStarting}
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
              title={messageComplete}
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
        <Button
          type="danger"
          onClick={onReset}
          style={{ marginTop: '16px', width: '10%' }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Home;
