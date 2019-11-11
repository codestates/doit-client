import React from 'react';
import { Card } from 'antd';

const TodoCard = ({ todo }) => {
  const startTime = todo.timelines[0].startedAt;
  return (
    <Card title={startTime} style={{ margin: '10px' }}>
      <p
        style={{
          fontSize: 14,
          color: 'rgba(0, 0, 0, 0.85)',
          marginBottom: 16,
          fontWeight: 500,
        }}
      ></p>
      <Card type="inner" title="Todo">
        {todo.todoContent}
      </Card>
      <Card style={{ marginTop: 16 }} type="inner" title="Done">
        {todo.doneContent}
      </Card>
    </Card>
  );
};

export default TodoCard;
