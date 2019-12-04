import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Typography, Row, Col, Card, Input } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { Button, message } from 'antd';

import { useDispatch } from 'react-redux';

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
      let data = await axios.delete(`/todo/${todo.id}`);
      if (data.status === 200) {
        dispatch({
          type: LOAD_TODOS_REQUEST,
          data: {
            date: moment(new Date(todo.timelines[0].startedAt)).format(
              'YYYY-MM-DD',
            ),
          },
        });
        message.success('삭제되었습니다');
      }
    } catch (error) {
      console.error(error);
      message.error('삭제 실패했어요 ㅠ');
      setIconLoading(false);
    }
  };

  return { iconLoading, deleteTodoDone };
};

const timeCalculator = (todo) => {
  let wholeDurationAsMinutes, concentTimeAsMinutes, restTimeAsMinutes;
  // console.log(todo.timelines);
  const startTime = todo.timelines[0].startedAt;
  const endTime = todo.timelines[todo.timelines.length - 1].endedAt;

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
  return { concentTimeAsMinutes, restTimeAsMinutes, startTime, endTime };
};

const HistoryCard = ({ todo, index }) => {
  const { iconLoading, deleteTodoDone } = useDeleteTodoDone(todo);
  const {
    concentTimeAsMinutes,
    restTimeAsMinutes,
    startTime,
    endTime,
  } = timeCalculator(todo);

  const todoCardTitle = `#${index +
    1} (${concentTimeAsMinutes}분 집중 / ${restTimeAsMinutes}분 화장실) ${timeFormat(
    startTime,
  )} ~ ${timeFormat(endTime)}`;

  return (
    <Wrapper id={todo.id}>
      <Col xs={24} md={20}>
        <Title level={4}>{todoCardTitle}</Title>
      </Col>
      <Col xs={24} md={4}>
        <Button type="primary" onClick={deleteTodoDone} loading={iconLoading}>
          삭제
        </Button>
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
