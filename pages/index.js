import React, { useState } from 'react';
import {
  Switch,
  Row,
  Col,
  Button
} from 'antd';
import styled from 'styled-components';

import Timer from '../components/Timer';
import TodoNote from '../components/TodoNote';
import Feedback from '../components/Feedback';


const Wrapper = styled.div`
  margin-top: 40px;

  @media (max-width: 767px) {
    &>div>.ant-col {
      margin-bottom: 40px;
    }  
  }
`;

const FeedbackLast = styled(Button)`
  position: fixed;
  bottom: 0;
  right: 0;
  height: 60px;
  font-size: 1.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #777;
  color: #fff;
  border: 0;
  border-radius: 0;

  &:hover {
    background: #999;
    color: #fff;
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
        <Col xs={24} md={8}>
          <Timer
            verifyContent={verifyContent}
            todoContent={todoContent}
            setTodoContent={setTodoContent}
            setDoneContent={setDoneContent}
          />
        </Col>

        <Col xs={24} md={16}>
          <TodoNote
            verifyContent={verifyContent}
            todoContent={todoContent}
            setTodoContent={setTodoContent}
            doneContent={doneContent}
            setDoneContent={setDoneContent}
          />
        </Col>
      </Row>

      <FeedbackLast
        type="link"
        size="large"
        href="https://docs.google.com/forms/d/e/1FAIpQLScnUOEzRw9EvgVkLU8WKSidIlImg48gj_N8TB_rbsqF9thWbA/viewform?vc=0&c=0&w=1"
        target="_blank"
      >
        두잇 팀을 위해 피드백을 주세욧
      </FeedbackLast>

      <Feedback />
    </Wrapper>
  );
};

export default Home;
