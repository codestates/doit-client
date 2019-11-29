import React from 'react';
import moment from 'moment';
import { Row, Col, Breadcrumb, Card, Input } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

const Wrapper = styled.div`
  margin: 0 10px;

  .ant-breadcrumb {
    margin-bottom: 10px;
  }

  .ant-card {
    border-radius: 4px;
    margin-bottom: 20px;

    & .ant-card-body {
      padding: 0;

      & > textarea:disabled {
        border: 0;
        border-top: 1px solid #ededed;
        background: #fff;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
`;

const timeFormat = (timestamp) => {
  const isValid = timestamp && moment(timestamp);
  return isValid
    ? moment(timestamp)
        .local()
        .format('HH시 mm분')
    : '??';
};

const TodoCard = ({ todo, index }) => {
  // console.log(todo);
  const startTime = todo.timelines[0].startedAt;
  const endTime = todo.timelines[todo.timelines.length - 1].endedAt;
  const realDuration =
    startTime && endTime
      ? moment(endTime).diff(moment(startTime), 'minutes')
      : '0분';
  const todoCardTitle = `${timeFormat(startTime)}부터 ${timeFormat(
    endTime,
  )}까지 했음`;

  return (
    <Wrapper id={todo.id}>
      <Breadcrumb separator="/">
        <Breadcrumb.Item>{index}번째</Breadcrumb.Item>
        <Breadcrumb.Item>{todoCardTitle}</Breadcrumb.Item>
        {/* <Breadcrumb.Item>{todo.duration}분</Breadcrumb.Item>
        <Breadcrumb.Item>{realDuration}분</Breadcrumb.Item> */}
      </Breadcrumb>

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

export default TodoCard;
