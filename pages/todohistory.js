import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Row, Col, BackTop } from 'antd';

import TodoCalendar from '../components/TodoCalendar';
import TodoCard from '../components/TodoCard';
import { LOAD_TODOS_REQUEST } from '../reducers/todoHistory';

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
          {todos.map((todo) => {
            return <TodoCard key={todo.id} todo={todo} />;
          })}
        </Col>
      </Row>
      <BackTop>
        <div className="ant-back-top-inner">UP</div>
      </BackTop>
  </div>
  );
};

todoHistory.getInitialProps = async (context) => {
  const today = moment().format('YYYY-MM-DD');
  context.store.dispatch({
    type: LOAD_TODOS_REQUEST,
    data: today,
  });
};


export default todoHistory;
