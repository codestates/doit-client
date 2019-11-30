import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Button, Form, Input, Icon, message } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getCookie } from '../utils/cookieHelper';
import { FEEDBACK_REQUEST } from '../reducers/feedback';

import messages from '../config/messages';

const { TextArea } = Input;

const StyledForm = styled(Form)`
  margin-top: 60px;

  @media (min-width: 768px) {
    button {
      height: 93px;
    }
  }
`;

const Feedback = () => {
  const [content, setContent] = useState('');

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const { isSubmitting, isSubmitted, submitError } = useSelector(
    (state) => state.feedback,
  );

  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: FEEDBACK_REQUEST,
        payload: { content },
      });
      setContent('');
    },
    [content],
  );

  useEffect(() => {
    if (isSubmitted) {
      message.info('피드백 감사합니다 ^0^ ');
    }
    if (submitError) {
      message.error('피드백 전달에 실패했어요 ㅠoㅠ');
    }
  }, [isSubmitted, submitError]);

  return (
    <StyledForm onSubmit={onSubmitForm}>
      <Row gutter={24} type="flex" justify="end">
        <Col xs={24} md={18}>
          <TextArea
            rows={4}
            placeholder={messages.feedback}
            onChange={onChangeContent}
            value={content}
            required
          />
        </Col>
        <Col xs={24} md={6}>
          <Button
            size="large"
            htmlType="submit"
            loading={isSubmitting}
            disabled={content.trim().length === 0}
          >
            <Icon type="highlight" />
            피드백 보내기
          </Button>
        </Col>
      </Row>
    </StyledForm>
  );
};

export default Feedback;
