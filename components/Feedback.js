import React, { useState, useCallback, useEffect } from 'react';
import { Row, Col, Button, Form, Input, message } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { FEEDBACK_REQUEST } from '../reducers/feedback';

import messages from '../config/messages';

const { TextArea } = Input;

const StyledForm = styled(Form)`
  margin-top: 60px;
`;

const Feedback = () => {
  const [content, setContent] = useState('');

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const { isSubmitting, isSubmitted, submitError } = useSelector(
    (state) => state.feedback,
  );
  let { me } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      // console.log('me', me);
      dispatch({
        type: FEEDBACK_REQUEST,
        payload: { content, userId: me.userId, nickname: me.nickname },
      });
      setContent('');
    },
    [content, me && me.userId, me && me.nickname],
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
        <Col xs={24} lg={24}>
          <TextArea
            rows={4}
            placeholder={messages.feedback}
            onChange={onChangeContent}
            value={content}
            required
          />
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isSubmitting}
            disabled={content.trim().length === 0}
          >
            피드백 보내기!
          </Button>
        </Col>
      </Row>
    </StyledForm>
  );
};

export default Feedback;
