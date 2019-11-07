import React from 'react';
import styled from 'styled-components';
import * as timerState from '../timerStates';

const Button = styled.button`
  margin: 0 8px;
`;

const TimerButton = props => {
  return (
    <div className="row">
      {props.timerState === timerState.NOT_SET ? (
        <div>
          <Button onClick={props.startTimer}>Start</Button>
          <Button onClick={props.resetTimer}>reset</Button>
        </div>
      ) : props.timerState === timerState.RUNNING ? (
        <div>
          <Button onClick={props.stopTimer}>pause</Button>
          <Button onClick={props.resetTimer}>reset</Button>
        </div>
      ) : (
        <div>
          <Button onClick={props.startTimer}>Start</Button>
          <Button onClick={props.stopTimer}>reset</Button>
        </div>
      )}
    </div>
  );
};

export default TimerButton;
