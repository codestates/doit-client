import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, Col, Row, Form, Button, Input } from 'antd';
import { DefaultLayout } from '../components/Layout';
import axios from 'axios';

const StyledRow = styled(Row)`
  margin-top: 40px;
`;

const StyledCol = styled(Col)`
  padding: 0 20px;
  height: max-content;
  max-width: 500px;
`;

const StyledInput = styled(Input)`
  &[type='number'] {
    text-align: center;
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledButton = styled(Button)`
  width: 120px;
  font-size: 1.5em;
`;

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(1);
  const [timerOn, setTimerOn] = useState(false);
  const [complete, setComplete] = useState(false);
  const [toDoText, setTodoText] = useState('');
  const [doneText, setDoneText] = useState('');
  const [textOn, setTextOn] = useState(true);

  const handleMinutes = e => {
    if (e.target.value <= 60 && e.target.value >= 0) {
      setMinutes(e.target.value);
    }
  };

  const handleSeconds = e => {
    if (e.target.value <= 60 && e.target.value >= 0) {
      setSeconds(e.target.value);
    }
  };

  const handleTimerOn = () => {
    if (toDoText.length === 0) {
      alert('ToDo를 작성해주세요.');
    } else {
      // Todo에 대한 데이터를 업데이트
      if (timerOn === false) {
        // 재시작에 대한 데이터를 업데이트
        setTimerOn(true);
      } else {
        // 멈춤에 대한 데이터를 업데이트
        setTimerOn(false);
      }
    }
  };

  const handleTodoText = e => {
    setTodoText(e.target.value);
    // axios로 연결 toDoText
  };

  const handleDoneText = e => {
    setDoneText(e.target.value);
  };
  const handleComplete = () => {
    alert('축하합니다! 완료하셨습니다.!');
    setMinutes(0);
    setSeconds(1);
    setTodoText('');
    setDoneText('');
    setTextOn(true);
    setTimerOn(false);
    setComplete(false);
  };

  const resetCheck = () => {
    console.log(
      'test: ',
      minutes,
      seconds,
      toDoText,
      doneText,
      timerOn,
      complete
    );
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (minutes < 0) {
        clearInterval(myInterval);
        setMinutes(0);
        setSeconds(0);
        setTimerOn(false);
      } else if (timerOn) {
        if (!seconds) {
          setSeconds(0);
        }
        if (!minutes) {
          setMinutes(0);
        }

        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
            setTimerOn(false);
            setTextOn(false);
            setComplete(true);
            alert('Done에 회고를 작성해주세요.');
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <DefaultLayout>
      <StyledRow type="flex" justify="center">
        <StyledCol>
          <Form>
            <Typography.Title level={3}>Timer</Typography.Title>
            <Form.Item style={{ textAlign: 'center' }}>
              <Col span={6} offset={5}>
                <StyledInput
                  type="number"
                  size="large"
                  value={minutes}
                  onChange={handleMinutes}
                  disabled={timerOn || complete}
                />
              </Col>
              <Col span={2}>
                <h2 style={{ margin: '0' }}>:</h2>
              </Col>
              <Col span={6}>
                <StyledInput
                  type="number"
                  size="large"
                  value={seconds}
                  onChange={handleSeconds}
                  disabled={timerOn || complete}
                />
              </Col>
            </Form.Item>
            <Form.Item>
              <Typography.Title level={3}>ToDo</Typography.Title>
              <Input.TextArea
                id="todo"
                rows="3"
                value={toDoText}
                onChange={handleTodoText}
                placeholder="할 일을 입력해주세요"
                disabled={timerOn || !textOn}
              >
                {toDoText}
              </Input.TextArea>
            </Form.Item>
            <Form.Item>
              <Typography.Title level={3}>Done</Typography.Title>
              <Input.TextArea
                id="done"
                rows="3"
                value={doneText}
                onChange={handleDoneText}
                placeholder="한 일을 입력해주세요"
                disabled={textOn}
              >
                {doneText}
              </Input.TextArea>
            </Form.Item>

            {complete ? (
              <StyledButton
                type="primary"
                size="large"
                onClick={handleComplete}
              >
                complete
              </StyledButton>
            ) : (
              <StyledButton type="primary" size="large" onClick={handleTimerOn}>
                {timerOn ? 'pause' : 'start'}
              </StyledButton>
            )}
          </Form>
        </StyledCol>
      </StyledRow>
    </DefaultLayout>
  );
};

export default Timer;
