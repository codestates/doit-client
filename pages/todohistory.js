import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, BackTop, Empty } from 'antd';
import Router from 'next/router';

import TodoCalendar from '../components/TodoCalendar';
import TodoCard from '../components/TodoCard';

const todoHistory = () => {
  const { todos } = useSelector((state) => state.todoHistory);
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/index');
    }
  }, [me && me.id]);

  return (
    <div>
      <Row>
        <Col xs={24}>
          <TodoCalendar />
        </Col>

        <Col xs={24}>
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
      <style jsx global>{`
        .ant-back-top {
          bottom: 100px;
        }

        .ant-back-top-inner {
          height: 40px;
          width: 40px;
          line-height: 40px;
          border-radius: 4px;
          background-color: #1088e9;
          color: #fff;
          text-align: center;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default todoHistory;
