import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Main = styled.div`
  width: auto;
  height: 150px;
  text-align: left;
  font-size: 1.5rem;
  border: 2px solid coral;
`;
const SubDiv = styled.div`
  margin-left: 50px;
  margin-bottom: 10px;
`;
const Input = styled.input`
  margin-left: 40px;
  height: 20px;
`;

const TimerSetting = props => {
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
    <Main>
      <SubDiv>
        <label>Hours</label>
        <Input
          id="hours"
          type="number"
          min="0"
          max="2"
          defaultValue={props.baseTime.get('hours')}
          onChange={handleChange}
        />
      </SubDiv>
      <SubDiv>
        <label>Minutes</label>
        <Input
          id="minutes"
          type="number"
          min="0"
          max="60"
          defaultValue={props.baseTime.get('minutes')}
          onChange={handleChange}
        />
      </SubDiv>
      <SubDiv>
        <label>Seconds</label>
        <Input
          id="seconds"
          type="number"
          min="0"
          max="59"
          defaultValue={props.baseTime.get('seconds')}
          onChange={handleChange}
        />
      </SubDiv>
    </Main>
  );
};

export default TimerSetting;
