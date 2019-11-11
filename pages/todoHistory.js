import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import TodoCard from '../components/TodoCard';
import TodoCalendar from '../components/TodoCalendar';
import { LOAD_TODOS_REQUEST } from '../reducers/todoHistory';

const todoHistory = () => {
  const { todos } = useSelector((state) => state.todoHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    dispatch({
      type: LOAD_TODOS_REQUEST,
      date: today,
    });
  }, []);

  return (
    <div>
      <TodoCalendar />
      {todos.map((todo) => {
        return <TodoCard key={todo.id} todo={todo} />;
      })}
    </div>
  );
};

export default todoHistory;
