import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Card, Input, Icon, message,
} from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  TODO_PAUSE_REQUEST,
  TODO_COMPLETE_REQUEST,
  TODO_COMPLETE_CLEANUP,
  SAVE_TODOCONTENT,
  FOCUS_ON_TODOCONTENT,
} from '../reducers/timer';
import messages from '../config/messages';
import verifyContent from '../utils/contentVerification';

const Wrapper = styled.div`
  button {
    width: 100%;
  }
`;

const TimerCard = ({ todoEl, doneEl }) => {
  const { TextArea } = Input;
  const {
    isStarted,
    isRunning,
    todoId,
    timelineId,
    isSavingTodo,
    isSaveTodoSuccess,
    isReseted,
    savedTodoContent,
  } = useSelector((state) => state.timer);

  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [todoContent, setTodoContent] = useState('');
  const [doneContent, setDoneContent] = useState('');

  useEffect(() => {
    if (!isSavingTodo && isSaveTodoSuccess) {
      message.success(messages.complete);
      dispatch({
        type: TODO_COMPLETE_CLEANUP,
      });
      dispatch({ type: SAVE_TODOCONTENT, payload: '' });
    }
  }, [isSavingTodo, isSaveTodoSuccess, dispatch]);

  useEffect(() => {
    if (isReseted) {
      setTodoContent('');
      setDoneContent('');
      dispatch({ type: SAVE_TODOCONTENT, payload: '' });
    }
  }, [isReseted, dispatch]);

  useEffect(() => {
    setTodoContent(savedTodoContent);
    todoEl.current.focus();
  }, [savedTodoContent, todoEl]);

  const onComplete = useCallback(() => {
    dispatch({
      type: TODO_PAUSE_REQUEST,
    });

    const verified = verifyContent(doneContent);
    if (!verified) {
      message.warning(messages.doneContentEmpty);
      return doneEl.current.focus();
    }
    dispatch({
      type: TODO_COMPLETE_REQUEST,
      data: {
        doneContent: verified || 'OK',
        todoId,
        timelineId,
        endedAt: moment().utc().format(),
      },
    });
    setTodoContent('');
    setDoneContent('');
    return todoEl.current.focus();
  }, [doneContent, todoId, timelineId, dispatch, doneEl, todoEl]);

  const onChangeTodoContent = useCallback((e) => {
    setTodoContent(e.target.value);
    if (e.target.value === '') {
      dispatch({ type: SAVE_TODOCONTENT, payload: '' });
    }
  }, [dispatch]);

  const onChangeDoneContent = useCallback((e) => {
    setDoneContent(e.target.value);
  }, []);

  return (
    <Wrapper>
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={12}>
          <Card title="할일">
            <TextArea
              value={todoContent}
              onChange={onChangeTodoContent}
              placeholder={messages.writeTodo}
              rows={7}
              disabled={isStarted || !me}
              ref={todoEl}
              onFocus={() => dispatch({ type: FOCUS_ON_TODOCONTENT })}
              onBlur={() => {
                dispatch({ type: SAVE_TODOCONTENT, payload: todoContent });
                dispatch({ type: FOCUS_ON_TODOCONTENT });
              }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="결국 한일">
            <TextArea
              value={doneContent}
              onChange={onChangeDoneContent}
              placeholder={messages.writeDone}
              rows={7}
              disabled={!isStarted || isRunning}
              ref={doneEl}
            />
          </Card>
        </Col>
      </Row>

      <Button
        type="primary"
        size="large"
        onClick={onComplete}
        loading={isSavingTodo}
        disabled={!isStarted}
      >
        <Icon type="check-circle" />
        할일 다 했으면 언제든 컴플릿!
      </Button>
    </Wrapper>
  );
};

TimerCard.propTypes = {
  todoEl: PropTypes.shape({ current: PropTypes.object }).isRequired,
  doneEl: PropTypes.shape({ current: PropTypes.object }).isRequired,
};

export default TimerCard;
