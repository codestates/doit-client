import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography, Col, Row, Form, Button, Input } from "antd";
import { DefaultLayout } from "../components/Layout";
import axios from "axios";
// idTodo, idTimelined
let userIdTodo, userIdTimelined;

const StyledRow = styled(Row)`
  margin-top: 40px;
`;

const StyledCol = styled(Col)`
  padding: 0 20px;
  height: max-content;
  max-width: 500px;
`;

const StyledInput = styled(Input)`
  &[type="number"] {
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
  const [timerOn, setTimerOn] = useState(false);
  const [complete, setComplete] = useState(false);
  const [toDoText, setTodoText] = useState("");
  const [doneText, setDoneText] = useState("");
  const [textOn, setTextOn] = useState(true);

  const [resume, setResume] = useState(false);

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

  // 다시 시작 멈춤 값이 필요함
  const handleTimerOn = async () => {
    if (toDoText.length === 0) {
      alert("ToDo를 작성해주세요.");
    } else {
      const res = await axios.post(
        "http://localhost:8085/api/todo",
        {
          todoContent: toDoText,
          duration: 25,
          startedAt: Date.now()
        },
        { withCredentials: true }
      );
      userIdTodo = res.data.data.todoId;
      userIdTimelined = res.data.data.timelineId;
      console.log("create", res);
      setTimerOn(true);
    }
  };

  const handleTimerOff = async () => {
    if (toDoText.length === 0) {
      alert("ToDo를 작성해주세요.");
    } else {
      const res = await axios.post(
        "http://localhost:8085/api/todo/pause",
        {
          todoId: userIdTodo,
          timelineId: userIdTimelined,
          endedAt: Date.now()
        },
        { withCredentials: true }
      );
      console.log("pause", res);
      setResume(true);
      setTimerOn(false);
    }
  };

  const handleResume = async () => {
    const res = await axios.post(
      "http://localhost:8085/api/todo/resume",
      {
        todoId: userIdTodo,
        startedAt: Date.now()
      },
      { withCredentials: true }
    );
    console.log("resume", res);
    setResume(false);
    setTimerOn(true);
  };

  const handleTodoText = e => {
    setTodoText(e.target.value);
  };

  const handleDoneText = e => {
    setDoneText(e.target.value);
  };

  const handleReset = () => {
    setMinutes(0);
    setSeconds(3);
    setTodoText("");
    setDoneText("");
    setTextOn(true);
    setTimerOn(false);
    setComplete(false);
  };
  const handleComplete = async () => {
    alert("축하합니다! 완료하셨습니다.!");
    const res = await axios.patch(
      "http://localhost:8085/api/todo",
      {
        doneContent: doneText,
        todoId: userIdTodo,
        timelineId: userIdTimelined,
        endedAt: Date.now()
      },
      { withCredentials: true }
    );
    console.log("the end", res);
    setMinutes(0);
    setSeconds(3);
    setTodoText("");
    setDoneText("");
    setTextOn(true);
    setTimerOn(false);
    setComplete(false);
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
            alert("Done에 회고를 작성해주세요.");
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
            <Form.Item style={{ textAlign: "center" }}>
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
                <h2 style={{ margin: "0" }}>:</h2>
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
            ) : resume ? (
              <StyledButton 
                type="primary" 
                size="large" 
                onClick={handleResume}>
                resume
              </StyledButton>
            ) : timerOn ? (
              <StyledButton
                type="primary"
                size="large"
                onClick={handleTimerOff}
              >
                pause
              </StyledButton>
            ) : (
              <StyledButton type="primary" size="large" onClick={handleTimerOn}>
                start
              </StyledButton>
            )}
            <StyledButton type="primary" size="large" onClick={handleReset}>
              reset
            </StyledButton>
          </Form>
        </StyledCol>
      </StyledRow>
    </DefaultLayout>
  );
};

export default Timer;
