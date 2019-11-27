import React, { useState } from 'react';
import {
  Row,
  Col
} from 'antd';
import styled from 'styled-components';

import Timer from '../components/Timer';
import TodoNote from '../components/TodoNote';

const Wrapper = styled.div`
  & > div {
    margin-top: 20px;
  }
`;

const Home = () => {
  const [todoContent, setTodoContent] = useState('');
  const [doneContent, setDoneContent] = useState('');

  const verifyContent = (content) => {
    const verified = content && content.trim();
    return verified && verified.length > 0 ? verified : null;
  };

  return (
    <Wrapper>
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} lg={8}>
          <Timer
            verifyContent={verifyContent}
            todoContent={todoContent}
            setTodoContent={setTodoContent}
            setDoneContent={setDoneContent}
          />
        </Col>

        <Col xs={24} lg={16}>
          <TodoNote 
            verifyContent={verifyContent}
            todoContent={todoContent}
            setTodoContent={setTodoContent}
            doneContent={doneContent}
            setDoneContent={setDoneContent}
          />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Home;
