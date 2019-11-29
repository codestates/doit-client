import React, { useCallback, useEffect } from 'react';
import { Calendar, Badge } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { LOAD_TODOS_REQUEST } from '../reducers/todoHistory';

const Wrapper = styled.div`
  border: 1px solid #ededed;
  border-radius: 4px;
  margin: 0 10px 20px 10px;
  background: #fff;
`;

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
      <div>
        {listData.map((item) => (
          <Badge key={item.createdDate} color="blue" style={{ paddingLeft: 7 }} />
        ))}
      </div>
    );
  }

  return (
    <Wrapper>
      <Calendar
        fullscreen={false}
        onSelect={onClickCalendar}
        dateCellRender={dateCellRender}
      />
    </Wrapper>
  );
};

export default TodoCalendar;
