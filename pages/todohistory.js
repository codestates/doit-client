import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, BackTop, Empty } from 'antd';
import styled from 'styled-components';
import Router from 'next/router';

import TodoCalendar from '../components/TodoCalendar';
import HistoryCard from '../components/HistoryCard';
import TimelineAnchors from '../components/TimelineAnchors';

const Wrapper = styled.div`
  padding-top: 40px;

  @media (max-width: 767px) {
    &>div>.ant-col {
      margin-bottom: 40px;
    }
  }
`;

const StyledBackTop = styled(BackTop)`
  bottom: 100px;

  &>.ant-back-top-inner {
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #1088e9;
    color: #fff;
    text-align: center;
  }
`;

const todoHistory = () => {
  const { todos } = useSelector((state) => state.todoHistory);
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/index');
    }
  }, [me && me.id]);

  return (
    <Wrapper>
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={8}>
          <TodoCalendar />
          <TimelineAnchors />
        </Col>

        <Col xs={24} md={16}>
          {todos.length ? (
            todos.map(todo => <HistoryCard key={todo.id} todo={todo} />)
          ) : (
            <Empty
             description={
              <span>
                <br />
                <br />
                한일이 없네;
              </span>
              }
            />
          )}
        </Col>
        <StyledBackTop>
          <div className="ant-back-top-inner">위로</div>
        </StyledBackTop>
      </Row>
    </Wrapper>
  );
};

export default todoHistory;
