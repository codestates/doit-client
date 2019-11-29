import React, { useCallback, useEffect } from 'react';
import { Calendar, Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { LOAD_TODOS_REQUEST } from '../reducers/todoHistory';

const TodoCalendar = () => {
  const { todosCount } = useSelector((state) => state.todoHistory);
  const dispatch = useDispatch();
  const onClickCalendar = useCallback((date) => {
    dispatch({
      type: LOAD_TODOS_REQUEST,
      data: {
        date: moment(date)
          .startOf('day')
          .local()
          .format(),
      },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_TODOS_REQUEST,
      data: {
        date: moment()
          .startOf('day')
          .local()
          .format(),
      },
    });
  }, []);

  function getListData(value) {
    const listData = todosCount.filter(
      (item) => item.createdDate === value.format('YYYY-MM-DD'),
    );
    return listData;
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <div style={{ textAlign: 'center' }}>
        {listData.map((item) => (
          <Badge key={item.createdDate} color="blue" />
        ))}
      </div>
    );
  }

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
        onSelect={onClickCalendar}
        dateCellRender={dateCellRender}
      />
    </div>
  );
};

export default TodoCalendar;
