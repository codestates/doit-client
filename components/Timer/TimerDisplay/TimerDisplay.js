import React from 'react';
import styled from 'styled-components';

const Display = styled.p`
  color: blue;
`;

const leftPad = val => {
  if (val < 10) return `0${val}`;

  return `${val}`;
};

const TimerDisplay = props => {
  return (
    <div>
      <Display>
        {`${leftPad(props.currentTime.get('hours'))}:${leftPad(
          props.currentTime.get('minutes')
        )}:
          ${leftPad(props.currentTime.get('seconds'))}`}
      </Display>
    </div>
  );
};

export default TimerDisplay;
