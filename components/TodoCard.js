import React from 'react';
import moment from 'moment';
import { Card, Input } from 'antd';

const { TextArea } = Input;

const TodoCard = ({ todo }) => {
  const startTime = todo.timelines[0].startedAt;

  return (
    <Card
      id={todo.id}
      title={moment(startTime)
        .local()
        .format('YYYY-MM-DD HH:mm:ss')}
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
