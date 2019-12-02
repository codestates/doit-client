import React, { useCallback, useEffect } from 'react';
import { Calendar, Badge } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { LOAD_TODOS_REQUEST } from '../reducers/todoHistory';

const Wrapper = styled.div`
  border-radius: 4px;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 1px 1px 0 0 #d9d9d9;

  .ant-fullcalendar-header {
    background: #f36c60;
    border: 0;
    border-radius: 4px 4px 0 0;
  }

  .ant-radio-button-wrapper-checked {
    color: #fff !important;
    background: #252525 !important;
    border-color: #252525 !important;
    box-shadow: none;
  }

  .ant-fullcalendar-selected-day .ant-fullcalendar-value,
  .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value {
    background: #252525 !important;
    box-shadow: none;
  }
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
  }, [dispatch]);

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
  }, [dispatch]);

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
          <Badge key={item.createdDate} color="#D86056" style={{ paddingLeft: 7 }} />
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
