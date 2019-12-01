import React, { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import TimerEl from '../components/TimerEl';
import TimerCard from '../components/TimerCard';
import Feedback from '../components/Feedback';

const Wrapper = styled.div`
  margin-top: 40px;

  @media (max-width: 767px) {
    & > div > .ant-col {
      margin-bottom: 40px;
    }
  }
`;

const Timer = () => {
  const [todoContent, setTodoContent] = useState('');
  const [doneContent, setDoneContent] = useState('');

  const verifyContent = (content) => {
    const verified = content && content.trim();
    return verified && verified.length > 0 ? verified : null;
  };

  const inputEl = useRef(null);
  const todoEl = useRef(null);

  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!me) {
      Router.push('/');
    }
  }, [me && me.id]);

  return (
    <Wrapper className="container">
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={8}>
          <TimerEl
            verifyContent={verifyContent}
            todoContent={todoContent}
            setTodoContent={setTodoContent}
            setDoneContent={setDoneContent}
            inputEl={inputEl}
            todoEl={todoEl}
          />
        </Col>

        <Col xs={24} md={16}>
          <TimerCard
            verifyContent={verifyContent}
            todoContent={todoContent}
            setTodoContent={setTodoContent}
            doneContent={doneContent}
            setDoneContent={setDoneContent}
            inputEl={inputEl}
            todoEl={todoEl}
          />
        </Col>
      </Row>
      <Feedback />
    </Wrapper>
  );
};

export default Timer;
