import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, BackTop, Empty } from 'antd';

import TodoCalendar from '../components/TodoCalendar';
import TodoCard from '../components/TodoCard';

import './todohistory.css';

const todoHistory = () => {
  const { todos } = useSelector((state) => state.todoHistory);

  return (
    <div>
      <Row>
        <Col xs={24} md={8}>
          <TodoCalendar />
        </Col>
        <Col xs={24} md={14}>
          {todos.length ? (
            todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
          ) : (
            <div style={{ margin: '20px 10px 10px 10px' }}>
              <Empty />
            </div>
          )}
        </Col>
      </Row>
      <BackTop>
        <div className="ant-back-top-inner">UP</div>
      </BackTop>
    </div>
  );
};

export default todoHistory;