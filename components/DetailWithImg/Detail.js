import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function Detail({ title, textList }) {
  return (
    <>
      <div className="TextDiv">
        <Title level={2}><b>{title}</b></Title>
        <Paragraph>
          {textList.map(text => (<p key={text}>{text}</p>))}
        </Paragraph>
      </div>
    </>
  );
}
