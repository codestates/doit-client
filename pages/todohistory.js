import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, BackTop, Empty, message } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import TodoCalendar from '../components/TodoCalendar';
import HistoryCard from '../components/HistoryCard';
import TimelineAnchors from '../components/TimelineAnchors';
import {
  LOAD_TODOS_REQUEST,
  DELETE_HISTORY_CLEANUP,
} from '../reducers/todoHistory';
import messages from '../config/messages';

const Wrapper = styled.div`
  padding-top: 40px;

  @media (max-width: 767px) {
    & > div > .ant-col {
      margin-bottom: 40px;
    }
  }
`;

const StyledBackTop = styled(BackTop)`
  bottom: 100px;

  & > .ant-back-top-inner {
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #252525;
    color: #fff;
    text-align: center;
  }
`;

const todoHistory = () => {
  const { todos,  deleteHistorySuccess, deleteHistoryError } = useSelector((state) => state.todoHistory);
  const { me } = useSelector((state) => state.user);


  const dispatch = useDispatch();

  useEffect(() => {
    if (!me) {
      Router.push('/timer');
    }
  }, [me && me.id]);

  // const { savedTodoContent, focusOnTodoContent } = useSelector((state) => state.timer);

  // useEffect(() => {
  //   const listener = (event) => {
  //     event.preventDefault();
  //     event.returnValue = '';
  //   };
  //   if (savedTodoContent !== '' || focusOnTodoContent) {
  //     window.addEventListener('beforeunload', listener);
  //   }
  //   return () => {
  //     window.removeEventListener('beforeunload', listener);
  //   };
  // }, [savedTodoContent, focusOnTodoContent]);

  useEffect(() => {
    if (deleteHistorySuccess) {
      const date = todos && todos.length > 0 && moment(todos[0].timelines[0].startedAt).format('YYYY-MM-DD');
      dispatch({
        type: LOAD_TODOS_REQUEST,
        data: {
          date
        },
      });
      dispatch({ type: DELETE_HISTORY_CLEANUP });
      message.success(messages.successDeleteTodoDone);
    }
  }, [deleteHistorySuccess]);

  useEffect(() => {
    if (deleteHistoryError !== '') {
      dispatch({ type: DELETE_HISTORY_CLEANUP });
      message.error(messages.failDeleteTodoDone);
    }
  }, [deleteHistoryError]);

  return (
    <Wrapper className="container">
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={8}>
          <TodoCalendar />
          <TimelineAnchors />
        </Col>

        <Col xs={24} md={16}>
          {todos.length ? (
            todos.map((todo, index) => (
              <HistoryCard key={todo.id} todo={todo} index={index} />
            ))
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
