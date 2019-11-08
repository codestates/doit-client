import React from 'react';


const leftPad = val => {
  if (val < 10) return `0${val}`;

  return `${val}`;
};

const TimerDisplay = (props) => {
  return (
    <div>
      {/* 색깔을 바꾸기 위함 */}
      <h2 style={{color: 'white', fontSize: '3.5rem', margin: '40px 0px'}}>
        {`${leftPad(props.currentTime.get('hours'))}:${leftPad(
          props.currentTime.get('minutes')
        )}:
          ${leftPad(props.currentTime.get('seconds'))}`}
      </h2>
    </div>
  );
};

export default TimerDisplay;
