import React, { useState, useRef } from 'react';
import { Row, Col, Input } from 'antd';
import styled from 'styled-components';

import Timer from '../components/Timer';
import TodoNote from '../components/TodoNote';
import Feedback from '../components/Feedback';

const Wrapper = styled.div`
  & > div {
    margin-top: 40px;
  }

  .clockRow,
  .todoRow {
    min-height: 310px;
  }
`;

const Home = () => {
  const [todoContent, setTodoContent] = useState('');
  const [doneContent, setDoneContent] = useState('');

  const verifyContent = (content) => {
    const verified = content && content.trim();
    return verified && verified.length > 0 ? verified : null;
  };

  const inputEl = useRef(null);

  return (
    <Wrapper>
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={8}>
          <Timer
            verifyContent={verifyContent}
            todoContent={todoContent}
            setTodoContent={setTodoContent}
            setDoneContent={setDoneContent}
            inputEl={inputEl}
          />
        </Col>

        <Col xs={24} md={16}>
          <TodoNote
            verifyContent={verifyContent}
            todoContent={todoContent}
            setTodoContent={setTodoContent}
            doneContent={doneContent}
            setDoneContent={setDoneContent}
            inputEl={inputEl}
          />
        </Col>
      </Row>
      <br />
      <hr />
      <br />
      <Feedback />
    </Wrapper>
  );
};

export default Home;
