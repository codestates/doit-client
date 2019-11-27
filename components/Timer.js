import React, { useEffect, useCallback } from 'react';
import {
  Typography,
  Row,
  Col,
  Popconfirm,
  Radio,
  Button,
  message
} from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  PAUSE_TIMER,
  RESUME_TIMER,
  RESET_TIMER,
  SET_TIMER,
  START_TIMER_AND_TODO_CREATE_REQUEST,
} from '../reducers/timer';
import messages from '../config/messages';

const { Title } = Typography;

const Wrapper = styled.div`
  .clock {
    text-align: center;
    padding-bottom: 10px;
    background: #fafafa;
    border: 1px solid #ededed;
    border-radius: 20px;
  
    & > h2.ant-typography {
      font-size: 6vw;
      margin-bottom: 0;
  
      @media (max-width: 767px) {
        font-size: 20vw;
      }
  
      @media (min-width: 1200px) {
        font-size: 72px;
    }
  
    & .select-time {
      width: 100%;
      text-align: center;
    }
  }
`;

const Timer = ({
  verifyContent,
  todoContent,
  setTodoContent,
  setDoneContent
}) => {
  const {
    totalTime,
    elapsedTime,
    isLoading,
    isStarted,
    isRunning,
    todoId,
  } = useSelector((state) => state.timer);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (totalTime === elapsedTime) {
      alert(messages.timerEnd);
      dispatch({
        type: PAUSE_TIMER,
      });
    }
  }, [elapsedTime && totalTime === elapsedTime]);

  const timeFormat = (totalTime) => {
    const min = String(Math.floor(totalTime / 60)).padStart(2, 0);
    const sec = String(totalTime % 60).padStart(2, 0);
    return `${min}:${sec}`;
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

  return (
    <Wrapper>
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

      <Row type="flex" justify="space-between">
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
          <Col xs={8}>
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

          <Col xs={14}>
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
        </>
        )}
      </Row>
    </Wrapper>
  );
};

export default Timer;
