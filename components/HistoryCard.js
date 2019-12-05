import React, { useState, useCallback } from 'react';
import moment from 'moment';
import {
  Typography,
  Row,
  Col,
  Card,
  Input,
  Button,
  message,
  Popconfirm,
} from 'antd';
import styled from 'styled-components';
import axios from 'axios';

import { useDispatch } from 'react-redux';

import messages from '../config/messages';
import { LOAD_TODOS_REQUEST } from '../reducers/todoHistory';

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
        .format('HH:mm')
    : '??';
};

const useDeleteTodoDone = (todo) => {
  const [iconLoading, setIconLoading] = useState(false);
  const dispatch = useDispatch();
  const deleteTodoDone = async () => {
    setIconLoading(true);
    try {
      const data = await axios.delete(`/todo/${todo.id}`);
      if (data.status === 200) {
        dispatch({
          type: LOAD_TODOS_REQUEST,
          data: {
            date: moment(todo.timelines[0].startedAt).format('YYYY-MM-DD'),
          },
        });
        message.success(messages.successDeleteTodoDone);
      }
    } catch (error) {
      console.error(error);
      message.error(messages.failDeleteTodoDone);
      setIconLoading(false);
    }
  };

  const cancelDelete = useCallback(() => {
    message.success(messages.notDeleteTodoDone);
  }, []);

  return { iconLoading, deleteTodoDone, cancelDelete };
};

const timeCalculator = (todo) => {
  let wholeDurationAsMinutes, concentTimeAsMinutes, restTimeAsMinutes;
  // console.log(todo.timelines);
  const startTime = todo.timelines[0].startedAt;
  const endTime = todo.timelines[todo.timelines.length - 1].endedAt;
  const stopNumber = todo.timelines.length - 1;

  if (startTime && endTime) {
    wholeDurationAsMinutes = Math.round(
      moment.duration(moment(endTime).diff(moment(startTime))).asMinutes(),
    );

    const totalConcentTime = todo.timelines
      .map((timeline) =>
        moment(timeline.endedAt).diff(moment(timeline.startedAt)),
      )
      .reduce((acc, elm) => acc + elm);

    concentTimeAsMinutes = Math.round(
      moment.duration(totalConcentTime).asMinutes(),
    );
    restTimeAsMinutes = wholeDurationAsMinutes - concentTimeAsMinutes;
  } else {
    concentTimeAsMinutes = '0';
    restTimeAsMinutes = '0';
  }
  return {
    concentTimeAsMinutes,
    restTimeAsMinutes,
    startTime,
    endTime,
    stopNumber,
  };
};

const HistoryCard = ({ todo, index }) => {
  const { iconLoading, deleteTodoDone, cancelDelete } = useDeleteTodoDone(todo);
  const {
    concentTimeAsMinutes,
    restTimeAsMinutes,
    startTime,
    endTime,
    stopNumber,
  } = timeCalculator(todo);

  const todoCardTitle = `#${index +
    1} (${concentTimeAsMinutes}분 집중 /  ${stopNumber}번(${restTimeAsMinutes}분) 멈춤) ${timeFormat(
    startTime,
  )} ~ ${timeFormat(endTime)}`;

  return (
    <Wrapper id={todo.id}>
      <Col xs={24} md={20}>
        <Title level={4}>{todoCardTitle}</Title>
      </Col>
      <Col xs={24} md={4}>
        <Popconfirm
          title={messages.askDeleteTodoDone}
          onConfirm={deleteTodoDone}
          onCancel={cancelDelete}
          okText={messages.yesDeleteTodoDone}
          cancelText={messages.noDeleteTodoDone}
        >
          <Button type="primary" loading={iconLoading}>
            삭제
          </Button>
        </Popconfirm>
      </Col>

      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={12}>
          <Card title="할일">
            <TextArea
              value={todo.todoContent}
              autoSize={{ minRows: 3 }}
              disabled
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="결국 한일">
            <TextArea
              value={todo.doneContent}
              autoSize={{ minRows: 3 }}
              disabled
            />
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default HistoryCard;
