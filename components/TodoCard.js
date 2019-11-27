import React from 'react';
import moment from 'moment';
import { Card, Input } from 'antd';

const { TextArea } = Input;

const timeFormat = (timestamp) => {
  const isValid = timestamp && moment(timestamp);
  return isValid
    ? moment(timestamp)
        .local()
        .format('HH:mm')
    : 'x';
};

const TodoCard = ({ todo }) => {
  const startTime = todo.timelines[0].startedAt;
  const endTime = todo.timelines[todo.timelines.length - 1].endedAt;
  const realDuration =
    startTime && endTime
      ? moment(endTime).diff(moment(startTime), 'minutes')
      : 'x';
  const todoCardTitle = `${timeFormat(startTime)} ~ ${timeFormat(endTime)}`;

  return (
    <Card
      id={todo.id}
      title={`${todoCardTitle} [${todo.duration}][${realDuration}]`}
      style={{
        border: '1px solid #d9d9d9',
        borderRadius: 4,
        margin: '10px',
      }}
    >
      <p
        style={{
          fontSize: 14,
          color: 'rgba(0, 0, 0, 0.85)',
          marginBottom: 16,
          fontWeight: 500,
        }}
      ></p>
      <Card type="inner" title="Todo" style={{ borderRadius: 4 }}>
        <TextArea
          value={todo.todoContent}
          disabled
          autoSize={{ minRows: 2 }}
          style={{
            border: '0px',
            background: 'transparent',
            resize: 'none',
            color: '#000',
          }}
        />
      </Card>
      <Card
        type="inner"
        title="Done"
        style={{ marginTop: 10, borderRadius: 4 }}
      >
        <TextArea
          value={todo.doneContent}
          autoSize={{ minRows: 2 }}
          disabled
          style={{
            border: '0px',
            background: 'transparent',
            resize: 'none',
            color: '#000',
          }}
        />
      </Card>
    </Card>
  );
};

export default TodoCard;
