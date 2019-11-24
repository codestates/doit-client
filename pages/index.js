import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Row,
  Col,
  Radio,
  Button,
  Card,
  Input,
  Popconfirm,
  message,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import {
  PAUSE_TIMER,
  RESUME_TIMER,
  RESET_TIMER,
  SET_TIMER,
  START_TIMER_AND_TODO_CREATE_REQUEST,
  TODO_COMPLETE_REQUEST,
  TODO_COMPLETE_CLEANUP,
} from '../reducers/timer';
import messages from '../config/messages';

const { Title } = Typography;

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
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const timeFormat = (totalTime) => {
    const min = String(Math.floor(totalTime / 60)).padStart(2, 0);
    const sec = String(totalTime % 60).padStart(2, 0);
    return `${min}:${sec}`;
  };

  const verifyContent = (content) => {
    const verified = content && content.trim();
    return verified && verified.length > 0 ? verified : null;
  };

  const onStart = useCallback(() => {
    const verified = verifyContent(todoContent);
    if (!verified) {
      return message.error(messages.todoContentEmpty);
    }
    dispatch({
      type: START_TIMER_AND_TODO_CREATE_REQUEST,
      data: {
        todoContent: verified,
        duration: timeFormat(totalTime),
        startedAt: moment()
          .utc()
          .format(),
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
    const verified = verifyContent(doneContent);
    if (!verified) {
      return message.warning(messages.doneContentEmpty);
    }
    dispatch({
      type: TODO_COMPLETE_REQUEST,
      data: {
        doneContent: verified || 'OK',
        todoId,
        timelineId,
        endedAt: moment()
          .utc()
          .format(),
      },
    });
    setTodoContent('');
    setDoneContent('');
  }, [doneContent, todoId, timelineId]);

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
    message.success(messages.cancel);
  }, []);

  const onClickTimeSetting = useCallback((e) => {
    dispatch({
      type: SET_TIMER,
      time: e.target.value * 60,
    });
  }, []);

  const onChangeTodoContent = useCallback((e) => {
    setTodoContent(e.target.value);
  }, []);

  const onChangeDoneContent = useCallback((e) => {
    setDoneContent(e.target.value);
  }, []);

  useEffect(() => {
    if (totalTime === elapsedTime) {
      alert(messages.timerEnd);
      dispatch({
        type: PAUSE_TIMER,
      });
    }
  }, [elapsedTime && totalTime === elapsedTime]);

  useEffect(() => {
    if (!isSavingTodo && isSaveTodoSuccess) {
      message.success(messages.complete);
      dispatch({
        type: TODO_COMPLETE_CLEANUP,
      });
    }
  }, [isSavingTodo === false, isSaveTodoSuccess === true]);

  return (
    <div className="timer">
      <div className="clock">
        <Title level={2}>{timeFormat(totalTime - elapsedTime)}</Title>
        <Radio.Group
          className="select-time"
          onChange={onClickTimeSetting}
          disabled={isStarted || !me}
        >
          <Radio.Button value="25">25</Radio.Button>
          <Radio.Button value="45">45</Radio.Button>
          <Radio.Button value="60">60</Radio.Button>
        </Radio.Group>
      </div>

      <Row>
        <Col>
          <Card type="inner" title="Todo">
            <TextArea
              value={todoContent}
              onChange={onChangeTodoContent}
              placeholder={messages.writeTodo}
              autoSize={{ minRows: 2 }}
              disabled={isStarted || !me}
            />
          </Card>
          <Card type="inner" title="Done">
            <TextArea
              value={doneContent}
              onChange={onChangeDoneContent}
              placeholder={messages.writeDone}
              autoSize={{ minRows: 2 }}
              disabled={!isStarted || isRunning}
            />
          </Card>
        </Col>
      </Row>

      <Row type="flex" justify="space-between">
        {/* start button을 클릭하면
            isLoading false -> true
            isStarted: false
            isRunning: false
            start request -> success
            isLoading true -> false
            isStarted: true
            isRunning: true
        */}
        {!isStarted ? (
          <Col xs={24}>
            <Button
              type="primary"
              onClick={onStart}
              loading={isLoading}
              disabled={!me}
            >
              Start
            </Button>
          </Col>
        ) : (
          <>
            <Col xs={24} md={4}>
              <Popconfirm
                title={messages.reset}
                onConfirm={onConfirmReset}
                onCancel={onCancelReset}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" ghost onClick={onReset}>
                  Reset
                </Button>
              </Popconfirm>
            </Col>

            <Col xs={24} md={9}>
              {isRunning ? (
                <Button type="primary" ghost onClick={onPause}>
                  Pause
                </Button>
              ) : (
                <Button type="primary" ghost onClick={onResume}>
                  Resume
                </Button>
              )}
            </Col>
            <Col xs={24} md={9}>
              <Button
                type="primary"
                onClick={onComplete}
                loading={isSavingTodo}
              >
                Complete!
              </Button>
            </Col>
          </>
        )}
      </Row>
      <style jsx global>{`
        .timer > div {
          margin-top: 20px;
        }

        div.clock {
          text-align: center;
          padding-bottom: 10px;
          background: #fafafa;
          border: 1px solid #ededed;
          border-radius: 20px;
        }

        .clock > h2.ant-typography {
          font-size: 8vw;
          margin-bottom: 0;
        }

        @media (max-width: 767px) {
          .clock > h2.ant-typography {
            font-size: 20vw;
          }
        }

        .select-time {
          width: 100%;
          text-align: center;
        }

        .ant-popover-message-title {
          width: 300px;
        }

        .timer div.ant-card {
          border-radius: 4px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Home;
