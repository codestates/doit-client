import React, { useState } from 'react';
import styled from 'styled-components';
import * as timerState from '../timerStates';

import TimerSetting from '../timerSetting/TimerSetting';
// 버튼 색깔이 안 나오는 문제
import { Button } from 'antd';


const TimerButton = props => {
  const [show, setShow] = useState(false);
  const showSetting = () => {
    setShow(!show);
  };

  return (
    <div>
      {props.timerState === timerState.NOT_SET ? (
        <div>
          <Button onClick={() => showSetting()}>Setting</Button>
          <TimerSetting
            onClose={showSetting}
            show={show}
            baseTime={props.baseTime}
            setBaseTime={props.setBaseTime}
          />{' '}
          <TimerSetting />
          <Button onClick={props.startTimer}>Start</Button>
          <Button onClick={props.resetTimer}>reset</Button>
        </div>
      ) : props.timerState === timerState.RUNNING ? (
        <div>
          <Button onClick={() => showSetting()}>Setting</Button>
          <TimerSetting
            onClose={showSetting}
            show={show}
            baseTime={props.baseTime}
            setBaseTime={props.setBaseTime}
          />{' '}
          <TimerSetting />
          <Button onClick={props.stopTimer}>pause</Button>
          <Button onClick={props.resetTimer}>reset</Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => showSetting()}>Setting</Button>
          <TimerSetting
            onClose={showSetting}
            show={show}
            baseTime={props.baseTime}
            setBaseTime={props.setBaseTime}
          />{' '}
          <TimerSetting />
          <Button onClick={props.startTimer}>Start</Button>
          <Button onClick={props.stopTimer}>reset</Button>
        </div>
      )}
    </div>
  );
};

export default TimerButton;
