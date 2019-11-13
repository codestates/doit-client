import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Typography, Col, Row, Form, Button, Input,
} from 'antd';
import fetchData from '../utils/fetchData';
import { DefaultLayout } from '../components/Layout';

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
  margin-right: 20px;
`;

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(3);
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [toDoText, setTodoText] = useState('');
  const [doneText, setDoneText] = useState('');
  const [textHandler, setTextHandler] = useState(true);

  let userIdTodo;
  let userIdTimelined;

  const initTimer = () => {
    setMinutes(0);
    setSeconds(3);
    setTodoText('');
    setDoneText('');
    setTextHandler(true);
    setIsStart(false);
    setIsComplete(false);
  };

  const handleMinutes = (e) => {
    if (e.target.value <= 60 && e.target.value >= 0) {
      setMinutes(e.target.value);
    }
  };

  const handleSeconds = (e) => {
    if (e.target.value <= 60 && e.target.value >= 0) {
      setSeconds(e.target.value);
    }
  };

  const handleTodoText = (e) => {
    setTodoText(e.target.value);
  };

  const handleDoneText = (e) => {
    setDoneText(e.target.value);
  };

  // 타이머 시작
  const startTimer = () => {
    if (toDoText.length === 0) {
      alert('ToDo를 작성해주세요.');
    } else {
      const body = {
        todoContent: toDoText,
        duration: 25,
        startedAt: Date.now(),
      };

      fetchData('post', 'todo', body).then((res) => {
        userIdTodo = res.data.data.todoId;
        userIdTimelined = res.data.data.timelineId;
        console.log('create', res);
        setIsStart(true);
      });
    }
  };

  // 타이머 멈춤
  const pauseTimer = () => {
    if (toDoText.length === 0) {
      alert('ToDo를 작성해주세요.');
    } else {
      const body = {
        todoId: userIdTodo,
        timelineId: userIdTimelined,
        endedAt: Date.now(),
      };

      fetchData('post', 'pause', body).then((res) => {
        console.log('pause', res);
        setIsPause(true);
      });
    }
  };

  // 타이머 재시작
  const resumeTimer = () => {
    const body = {
      todoId: userIdTodo,
      timelineId: userIdTimelined,
      endedAt: Date.now(),
    };

    fetchData('post', 'resume', body).then((res) => {
      console.log('resume', res);
      setIsPause(false);
    });
  };

  // 타이머 완료
  const completeTimer = async () => {
    alert('축하합니다! 완료하셨습니다.!');

    const body = {
      doneContent: doneText,
      todoId: userIdTodo,
      timelineId: userIdTimelined,
      endedAt: Date.now(),
    };

    fetchData('patch', 'todo', body).then((res) => {
      console.log('the end', res);
      initTimer();
    });
  };

  const resetTimer = () => {
    initTimer();
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (minutes < 0) {
        clearInterval(myInterval);
        setMinutes(0);
        setSeconds(0);
        setIsStart(false);
      } else if (isStart) {
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
            setIsStart(false);
            setIsComplete(true);
            setTextHandler(false);
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
                  disabled={isStart || isComplete}
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
                  disabled={isStart || isComplete}
                />
              </Col>
            </Form.Item>
            <Form.Item>
              <Typography.Title level={3}>ToDo</Typography.Title>
              <Input.TextArea
                rows="3"
                value={toDoText}
                onChange={handleTodoText}
                placeholder="할 일을 입력해주세요"
                disabled={isStart || !textHandler}
              >
                {toDoText}
              </Input.TextArea>
            </Form.Item>
            <Form.Item>
              <Typography.Title level={3}>Done</Typography.Title>
              <Input.TextArea
                rows="3"
                value={doneText}
                onChange={handleDoneText}
                placeholder="한 일을 입력해주세요"
                disabled={textHandler}
              >
                {doneText}
              </Input.TextArea>
            </Form.Item>

            {(!isStart && !isComplete) ? (
              <StyledButton type="primary" size="large" onClick={startTimer}>
                start
              </StyledButton>
            ) : (
              <StyledButton
                type="primary"
                size="large"
                onClick={completeTimer}
              >
                complete
              </StyledButton>
            )}

            {(isStart && !isComplete && !isPause) ? (
              <StyledButton
                type="primary"
                size="large"
                onClick={pauseTimer}
              >
                pause
              </StyledButton>
            ) : (
              <StyledButton type="primary" size="large" onClick={resumeTimer}>
                resume
              </StyledButton>
            )}

            <StyledButton type="primary" size="large" onClick={resetTimer}>
              reset
            </StyledButton>
          </Form>
        </StyledCol>
      </StyledRow>
    </DefaultLayout>
  );
};

export default Timer;
