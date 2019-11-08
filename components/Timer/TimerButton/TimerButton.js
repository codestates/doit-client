import React, { useState } from 'react';
import styled from 'styled-components';
import * as timerState from '../timerStates';

import TimerSetting from '../timerSetting/TimerSetting';
// 버튼 색깔이 안 나오는 문제
import { Button, Row } from 'antd';

const TimerButton = props => {
  const [show, setShow] = useState(false);
  const showSetting = () => {
    setShow(!show);
  };

  return (
    <div>
      {props.timerState === timerState.NOT_SET ? (
        <Row>
          <Button type="primary" onClick={props.startTimer}>
            Start
          </Button>
          <Button type="danger" onClick={props.resetTimer}>
            reset
          </Button>
          <Button type="link" onClick={() => showSetting()}>
            Setting
          </Button>
          <TimerSetting
            onClose={showSetting}
            show={show}
            baseTime={props.baseTime}
            setBaseTime={props.setBaseTime}
          />{' '}
          <TimerSetting />
        </Row>
      ) : props.timerState === timerState.RUNNING ? (
        <Row>
          <Button type="primary" onClick={props.stopTimer}>
            pause
          </Button>
          <Button type="danger" onClick={props.resetTimer}>
            reset
          </Button>
          <Button type="link" onClick={() => showSetting()}>
            Setting
          </Button>
          <TimerSetting
            onClose={showSetting}
            show={show}
            baseTime={props.baseTime}
            setBaseTime={props.setBaseTime}
          />{' '}
          <TimerSetting />
        </Row>
      ) : (
        <Row>
          <Button type="primary" onClick={props.startTimer}>
            Start
          </Button>
          <Button type="danger" onClick={props.stopTimer}>
            reset
          </Button>
          <Button type="link" onClick={() => showSetting()}>
            Setting
          </Button>
          <TimerSetting
            onClose={showSetting}
            show={show}
            baseTime={props.baseTime}
            setBaseTime={props.setBaseTime}
          />{' '}
          <TimerSetting />
        </Row>
      )}
    </div>
  );
};

export default TimerButton;
