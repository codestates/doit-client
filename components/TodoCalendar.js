import React, { useCallback } from 'react';
import { Calendar } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { SET_LOAD_DATE, LOAD_TODOS_REQUEST } from '../reducers/todoHistory';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

const TodoCalendar = () => {
  const dispatch = useDispatch();
  const onClickCalendar = useCallback((date) => {
    // console.log(moment(date).format('YYYY-MM-DD'));
    dispatch({
      type: LOAD_TODOS_REQUEST,
      date: moment(date).format('YYYY-MM-DD'),
    });
  }, []);

  return (
    <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
      <Calendar
        fullscreen={false}
        onPanelChange={onPanelChange}
        onSelect={onClickCalendar}
      />
    </div>
  );
};

export default TodoCalendar;
