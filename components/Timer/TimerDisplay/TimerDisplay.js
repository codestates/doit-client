import React from 'react';


const leftPad = val => {
  if (val < 10) return `0${val}`;

  return `${val}`;
};

const TimerDisplay = (props) => {
  return (
    <div>
      {/* timer 페이지에서 색깔을 바꾸기 위함 */}
      <h2 style={{color: 'white', fontSize: '4.5rem', margin: '80px 0px'}}>
        {`${leftPad(props.currentTime.get('hours'))}:${leftPad(
          props.currentTime.get('minutes')
        )}:${leftPad(props.currentTime.get('seconds'))}`}
      </h2>
    </div>
  );
};

export default TimerDisplay;
