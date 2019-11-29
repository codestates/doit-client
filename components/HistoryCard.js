import React from 'react';
import moment from 'moment';
import { Typography, Row, Col, Card, Input } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;
const { TextArea } = Input;

const Wrapper = styled.div`
  margin: 0 10px;

  h4.ant-typography {
    font-size: 1.2em;
    font-weight: 300;
  }
`;

const timeFormat = (timestamp) => {
  const isValid = timestamp && moment(timestamp);
  return isValid
    ? moment(timestamp)
        .local()
        .format('HH시 mm분')
    : '알 수 없는 시간';
};

const HistoryCard = ({ todo }) => {
  // console.log(todo);
  const startTime = todo.timelines[0].startedAt;
  const endTime = todo.timelines[todo.timelines.length - 1].endedAt;
  const realDuration =
    startTime && endTime
      ? moment(endTime).diff(moment(startTime), 'minutes')
      : '0';
  const todoCardTitle = `${timeFormat(
    startTime,
  )}부터 ${realDuration}분동안 ${timeFormat(endTime)}까지 열정을 다했음`;

  return (
    <Wrapper id={todo.id}>
      <Title level={4}>{todoCardTitle}</Title>

      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={12}>
          <Card title="할일">
            <TextArea
              value={todo.todoContent}
              autoSize={{ minRows: 6 }}
              disabled
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="결국 한일">
            <TextArea
              value={todo.doneContent}
              autoSize={{ minRows: 6 }}
              disabled
            />
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default HistoryCard;
