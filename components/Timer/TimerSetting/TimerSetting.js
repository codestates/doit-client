import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const MyModal = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background: white;
  padding: 1rem;
  width: 400px;
  height: auto;
`;

const TimerSetting = props => {
  const onClose = e => {
    props.onClose && props.onClose(e);
  };

  if (!props.show) {
    return null;
  }
  const handleChange = e => {
    let newBaseTime = props.baseTime;

    if (e.target.id === 'hours')
      newBaseTime
        .subtract(newBaseTime.get('hours'), 'hours')
        .add(parseInt(e.target.value, 10), 'hours');
    if (e.target.id === 'minutes')
      newBaseTime
        .subtract(newBaseTime.get('minutes'), 'minutes')
        .add(parseInt(e.target.value, 10), 'minutes');
    if (e.target.id === 'seconds')
      newBaseTime
        .subtract(newBaseTime.get('seconds'), 'seconds')
        .add(parseInt(e.target.value, 10), 'seconds');

    props.setBaseTime(newBaseTime);
  };

  return (
    <MyModal>
      <Content>
        <div>
          <label>Hours</label>
          <input
            id="hours"
            type="number"
            min="0"
            max="10"
            defaultValue={props.baseTime.get('hours')}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Minutes</label>
          <input
            id="minutes"
            type="number"
            min="0"
            max="60"
            defaultValue={props.baseTime.get('minutes')}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Seconds</label>
          <input
            id="seconds"
            type="number"
            min="0"
            max="59"
            defaultValue={props.baseTime.get('seconds')}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            onClick={e => {
              onClose(e);
            }}
          >
            Close
          </button>
        </div>
      </Content>
    </MyModal>
  );
};

export default TimerSetting;
