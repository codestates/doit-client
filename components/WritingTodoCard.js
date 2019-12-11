import React from 'react';
import { Card, Input } from 'antd';

const WritingTodoCard = () => {
  const { TextArea } = Input;
  return (
    <div>
      <Card type="inner" title="Todo">
        <TextArea
          placeholder="Controlled autosize"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Card>
      <Card style={{ marginTop: 16 }} type="inner" title="Done">
        <TextArea
          placeholder="Controlled autosize"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Card>
    </div>
  );
};

export default WritingTodoCard;
