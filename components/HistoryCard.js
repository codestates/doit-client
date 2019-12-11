import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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

import messages from '../config/messages';
import {
  DELETE_HISTORY_REQUEST,
} from '../reducers/todoHistory';

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
    ? moment(timestamp).local().format('HH:mm')
    : '??';
};

const timeCalculator = (todo) => {
  let wholeDurationAsMinutes = '0';
  let concentTimeAsMinutes = '0';
  let restTimeAsMinutes = '0';

  const startTime = todo.timelines[0].startedAt;
  const endTime = todo.timelines[todo.timelines.length - 1].endedAt;
  const stopNumber = todo.timelines.length - 1;

  if (startTime && endTime) {
    wholeDurationAsMinutes = Math.round(
      moment.duration(moment(endTime).diff(moment(startTime))).asMinutes(),
    );

    const totalConcentTime = todo.timelines
      .map(
        (timeline) => moment(timeline.endedAt).diff(moment(timeline.startedAt)),
      ).reduce((acc, elm) => acc + elm);

    concentTimeAsMinutes = Math.round(
      moment.duration(totalConcentTime).asMinutes(),
    );
    restTimeAsMinutes = wholeDurationAsMinutes - concentTimeAsMinutes;
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
  const dispatch = useDispatch();

  const deleteTodoDone = useCallback((selectedTodo) => {
    dispatch({ type: DELETE_HISTORY_REQUEST, payload: selectedTodo.id });
  }, [dispatch]);

  const cancelDelete = useCallback(() => {
    message.success(messages.notDeleteTodoDone);
  }, []);

  const {
    concentTimeAsMinutes,
    restTimeAsMinutes,
    startTime,
    endTime,
    stopNumber,
  } = timeCalculator(todo);

  const todoCardTitle = `#${index + 1} (${concentTimeAsMinutes}분 집중 / ${stopNumber}번(${restTimeAsMinutes}분) 멈춤) ${timeFormat(startTime)} ~ ${timeFormat(endTime)}`;
  return (
    <Wrapper id={todo.id}>
      <Col xs={24} md={20}>
        <Title level={4}>{todoCardTitle}</Title>
      </Col>
      <Col xs={24} md={4}>
        <Popconfirm
          title={messages.askDeleteTodoDone}
          onConfirm={() => deleteTodoDone(todo)}
          onCancel={cancelDelete}
          okText={messages.yesDeleteTodoDone}
          cancelText={messages.noDeleteTodoDone}
        >
          <Button type="primary">
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

HistoryCard.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired,
    todoContent: PropTypes.string.isRequired,
    doneContent: PropTypes.string,
    timelines: PropTypes.array.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default HistoryCard;
