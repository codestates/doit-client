import React from 'react';
import moment from 'moment';
import { Card, Input } from 'antd';

const { TextArea } = Input;

const TodoCard = ({ todo }) => {
  const startTime = todo.timelines[0].startedAt;

  return (
    <Card
      title={moment(startTime).local().format('YYYY-MM-DD HH:mm:ss')}
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
      <Card type="inner" title="Todo">
        <TextArea value={todo.todoContent} disabled style={{ border: '0px', background: 'transparent', resize: 'none', color: '#000' }}/>
      </Card>
      <Card style={{ marginTop: 16 }} type="inner" title="Done">
        <TextArea value={todo.doneContent} disabled style={{ border: '0px', background: 'transparent', resize: 'none', color: '#000' }}/>
      </Card>
    </Card>
  );
};

export default TodoCard;
