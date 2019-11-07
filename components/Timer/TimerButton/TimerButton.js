import React from 'react';
import styled from 'styled-components';
import * as timerState from '../timerStates';

const Button = styled.button`
  padding: 20px;
  margin: 5px;
`;

const TimerButton = props => {
  //추가 및 수정 작업
  const getButton = () => {
    if (props.timerState === timerState.NOT_SET)
      return (
        <div>
          <button onClick={props.startTimer}>Start</button>
          <button onClick={props.resetTimer}>reset</button>
        </div>
      );
    if (props.timerState === timerState.RUNNING)
      return (
        <div>
          <button onClick={props.stopTimer}>pause</button>
          <button onClick={props.resetTimer}>reset</button>
        </div>
      );
    if (props.timerState === timerState.COMPLETE)
      return (
        <div>
          <button onClick={props.startTimer}>Start</button>
          <button onClick={props.stopTimer}>reset</button>
        </div>
      );
  };
  return <div className="row">{getButton()}</div>;
};

export default TimerButton;
