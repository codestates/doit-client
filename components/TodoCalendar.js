import React, { useCallback, useEffect } from 'react';
import { Calendar } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { LOAD_TODOS_REQUEST } from '../reducers/todoHistory';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

const TodoCalendar = () => {
  const dispatch = useDispatch();
  const onClickCalendar = useCallback((date) => {
    dispatch({
      type: LOAD_TODOS_REQUEST,
      data: {
        date: moment(date).local().format('YYYY-MM-DD')
      }
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_TODOS_REQUEST,
      data: {
        date: moment().local().format('YYYY-MM-DD')
      }
    });
  }, []);

  return (
    <div
      style={{
        border: '1px solid #d9d9d9',
        borderRadius: 4,
        margin: '10px',
      }}
    >
      <Calendar
        fullscreen={false}
        onPanelChange={onPanelChange}
        onSelect={onClickCalendar}
      />
    </div>
  );
};

export default TodoCalendar;
