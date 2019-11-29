import React, { useEffect, useCallback } from 'react';
import {
  Typography,
  Row,
  Col,
  Popconfirm,
  Radio,
  Button,
  Icon,
  message,
  Modal,
} from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Howl } from 'howler';

import {
  PAUSE_TIMER,
  RESUME_TIMER,
  RESET_TIMER,
  SET_TIMER,
  START_TIMER_AND_TODO_CREATE_REQUEST,
} from '../reducers/timer';
import messages from '../config/messages';
import BtnSound from './BtnSound';

const { Title } = Typography;

const Clock = styled.div`
  text-align: center;
  padding-bottom: 10px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px 4px 0 0;
  border-bottom: 0;
  min-height: 214px;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: keep-all;

  & > h2.ant-typography {
    font-size: 5vw;
    font-weight: 300;
    margin-bottom: 0;

    @media (max-width: 767px) {
      font-size: 15vw;
    }

    @media (min-width: 1200px) {
      font-size: 60px;
    }
  }
`;

const RadioGroup = styled(Radio.Group)`
  width: 100%;

  .ant-radio-button-wrapper:first-child {
    border-radius: 0 0 0 4px;
  }

  .ant-radio-button-wrapper:last-child {
    border-radius: 0 0 4px 0;
  }

  & > label {
    width: 33.33333%;
    text-align: center;
  }
`;

const Timer = ({
  verifyContent,
  todoContent,
  setTodoContent,
  setDoneContent,
}) => {
  const {
    totalTime,
    elapsedTime,
    isLoading,
    isStarted,
    isRunning,
    todoId,
    isSoundOn,
  } = useSelector((state) => state.timer);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const sound = new Howl({
    src: ['/sounds/Christmas_Village_64.mp3'],
    onplayerror: function() {
      sound.once('unlock', function() {
        sound.play();
      });
    },
  });

  useEffect(() => {
    if (totalTime === elapsedTime) {
      dispatch({
        type: PAUSE_TIMER,
      });
      if (isSoundOn) {
        sound.play();
      }
      Modal.success({
        title: messages.timerEnd,
        onOk() {
          sound.stop();
        },
      });
    }
  }, [elapsedTime && totalTime === elapsedTime, isSoundOn]);

  const timeFormat = (totalTime) => {
    const min = String(Math.floor(totalTime / 60)).padStart(2, 0);
    const sec = String(totalTime % 60).padStart(2, 0);
    return `${min}분 ${sec}초 남았습니다`;
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
        duration: totalTime / 60,
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

  const onClickTimeSetting = useCallback((e) => {
    dispatch({
      type: SET_TIMER,
      time: e.target.value * 60,
    });
  }, []);

  return (
    <div>
      <div>
        <Clock>
          <Title level={2}>{timeFormat(totalTime - elapsedTime)}</Title>
        </Clock>
        <RadioGroup
          onChange={onClickTimeSetting}
          defaultValue="25"
          buttonStyle="solid"
          disabled={isStarted || !me}
        >
          <Radio.Button value="0.1">0.1</Radio.Button>
          <Radio.Button value="25">25</Radio.Button>
          <Radio.Button value="45">45</Radio.Button>
          {/* <Radio.Button value="60">60</Radio.Button> */}
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
                <Button
                  type="danger"
                  size="large"
                  ghost
                  onClick={onReset}
                >
                  <Icon type="reload" />
                  리셋
                </Button>
              </Popconfirm>
            </Col>

            <Col xs={14}>
              {isRunning ? (
                <Button
                  type="primary"
                  size="large"
                  ghost
                  onClick={onPause}
                >
                  <Icon type="stop" />
                  잠깐 화장실 좀
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  ghost
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

export default Timer;
