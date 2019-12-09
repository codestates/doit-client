import React, { useCallback } from 'react';
import {
  Typography,
  Row,
  Col,
  Popconfirm,
  Radio,
  Button,
  Icon,
  message,
} from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import {
  TODO_PAUSE_REQUEST,
  PAUSE_TIMER,
  RESUME_TIMER,
  RESET_TIMER,
  SET_TIMER,
  START_TIMER_AND_TODO_CREATE_REQUEST,
} from '../reducers/timer';
import messages from '../config/messages';
import BtnSound from './BtnSound';
import verifyContent from '../utils/contentVerification';

const { Title } = Typography;

const Clock = styled.div`
  text-align: center;
  padding-bottom: 10px;
  background: #252525;
  box-shadow: 1px 1px 0 0 #d9d9d9;
  border-radius: 4px 4px 0 0;
  min-height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: keep-all;

  & > h2.ant-typography {
    color: #fff;
    font-size: 10vw;
    font-weight: 300;
    font-family: 'digital-clock-font-mono';
    margin-bottom: 0;

    @media (max-width: 767px) {
      font-size: 30vw;
    }

    @media (min-width: 1200px) {
      font-size: 120px;
    }

    span {
      font-family: 'digital-clock-font';
    }
  }
`;

const RadioGroup = styled(Radio.Group)`
  width: 100%;
  border-top: 0;

  .ant-radio-button-wrapper:first-child {
    border-radius: 0 0 0 4px;
  }

  .ant-radio-button-wrapper:last-child {
    border-radius: 0 0 4px 0;
  }

  & > label {
    width: 33.33333%;
    text-align: center;
    border-top: 0;

    &:hover {
      color: #252525;
    }

    &.ant-radio-button-wrapper-checked {
      background: #252525 !important;
      border-color: #252525 !important;
      box-shadow: none !important;
    }
  }
`;

const TimerEl = ({ todoEl }) => {
  const {
    totalTime,
    elapsedTime,
    isLoading,
    isStarted,
    isRunning,
    todoId,
    timelineId,
    todoContent,
  } = useSelector((state) => state.timer);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const timeFormat = (totalTime) => {
    const min = String(Math.floor(totalTime / 60)).padStart(2, 0);
    const sec = String(totalTime % 60).padStart(2, 0);
    return (
      <>
        {min}
        <span>:</span>
        {sec}
      </>
    );
  };

  const onStart = useCallback(() => {
    const verified = verifyContent(todoContent);
    if (!verified) {
      message.warning(messages.todoContentEmpty);
      return setTimeout(() => {
        todoEl.current.focus();
      }, 500);
    }
    dispatch({
      type: START_TIMER_AND_TODO_CREATE_REQUEST,
      data: {
        todoContent: verified,
        duration: totalTime / 60,
        startedAt: moment()
          .utc()
          .format(),
      },
    });
  }, [dispatch, todoEl, totalTime]);

  const onPause = useCallback(() => {
    dispatch({
      // type: PAUSE_TIMER,
      type: TODO_PAUSE_REQUEST,
      data: {
        todoId,
        timelineId,
        endedAt: moment()
          .utc()
          .format(),
      },
    });
  }, [dispatch, todoId, timelineId]);

  const onResume = useCallback(() => {
    dispatch({
      type: RESUME_TIMER,
      data: {
        todoId,
        startedAt: moment()
          .utc()
          .format(),
      },
    });
  }, [dispatch, todoId]);

  const onReset = useCallback(() => {
    dispatch({
      type: PAUSE_TIMER,
    });
  }, [dispatch]);

  const onConfirmReset = useCallback(() => {
    dispatch({
      type: RESET_TIMER,
      data: {
        todoId,
      },
    });
  }, [todoId, dispatch]);

  const onClickTimeSetting = useCallback(
    (e) => {
      dispatch({
        type: SET_TIMER,
        time: e.target.value * 60,
      });
    },
    [dispatch],
  );

  return (
    <div>
      <div>
        <Clock>
          <Title level={2}>{timeFormat(totalTime - elapsedTime)}</Title>
        </Clock>
        <RadioGroup
          onChange={onClickTimeSetting}
          defaultValue={totalTime ? String(totalTime / 60) : '25'}
          buttonStyle="solid"
          disabled={isStarted || !me}
        >
          {/* <Radio.Button value="0.1">6</Radio.Button> */}
          <Radio.Button value="25">25</Radio.Button>
          <Radio.Button value="45">45</Radio.Button>
          <Radio.Button value="60">60</Radio.Button>
        </RadioGroup>
        <BtnSound />
      </div>

      <Row type="flex" justify="space-between">
        {!isStarted ? (
          <Col xs={24}>
            <Button
              type="primary"
              size="large"
              onClick={onStart}
              loading={isLoading}
              disabled={!me}
            >
              <Icon type="clock-circle" />
              두잇 나우!
            </Button>
          </Col>
        ) : (
          <>
            <Col xs={8}>
              <Popconfirm
                title={messages.reset}
                onConfirm={onConfirmReset}
                okText="넵 다시 시작할게요"
                cancelText="아니요 계속 합니다"
              >
                <Button type="danger" size="large" onClick={onReset}>
                  <Icon type="reload" />
                  리셋
                </Button>
              </Popconfirm>
            </Col>

            <Col xs={14}>
              {isRunning ? (
                <Button size="large" onClick={onPause}>
                  <Icon type="stop" />
                  잠깐 화장실 좀
                </Button>
              ) : (
                <Button
                  size="large"
                  onClick={onResume}
                  disabled={totalTime === elapsedTime}
                >
                  <Icon type="play-circle" />
                  화장실 다녀옴
                </Button>
              )}
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default TimerEl;
