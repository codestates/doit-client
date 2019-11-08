import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Layout, Button, Input, Row, Col } from 'antd';
const {Content} = Layout;
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

const Div = styled.div`
  position: absolute;
  background: white;
  padding: 1rem;
  width: 400px;
  height: auto;
  z-index: 10;
`;

const TimerSetting = props => {
  const onClose = e => {
    props.onClose && props.onClose();
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
    <Layout>
      <MyModal>
        <Content>
          <Div>
            <div>
              <label>Hours</label>
              <Input
                id="hours"
                type="number"
                min="0"
                max="10"
                defaultValue={props.baseTime.get('hours')}
                onChange={handleChange}
                style={{ width: '50%' }}
              />
            </div>
            <div>
              <label>Minutes</label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="60"
                defaultValue={props.baseTime.get('minutes')}
                onChange={handleChange}
                style={{ width: '50%' }}
              />
            </div>
            <div>
              <label>Seconds</label>
              <Input
                id="seconds"
                type="number"
                min="0"
                max="59"
                defaultValue={props.baseTime.get('seconds')}
                onChange={handleChange}
                style={{ width: '50%' }}
              />
            </div>
            <div>
              <Button
                onClick={e => {
                  onClose(e);
                }}
              >
                Close
              </Button>
            </div>
          </Div>
        </Content>
      </MyModal>
    </Layout>
  );
};

export default TimerSetting;
