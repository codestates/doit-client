import React, { useState, useCallback, useEffect } from 'react';

import { Row, Col, Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { FEEDBACK_REQUEST } from '../reducers/feedback';

import messages from '../config/messages';

const { TextArea } = Input;

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
      console.log('me', me);
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
      message.info('피드백 감사합니다 ^^ ');
    }
    if (submitError) {
      message.error('피드백 전달에 실패했어요 ㅠ');
    }
  }, [isSubmitted, submitError]);

  return (
    <>
      <Form onSubmit={onSubmitForm}>
        <Row gutter={24} type="flex" justify="space-between"></Row>
        <Col xs={24} lg={18}>
          <TextArea
            rows={4}
            placeholder={messages.feedback}
            onChange={onChangeContent}
            value={content}
            required
          />
        </Col>
        <Col xs={24} lg={6}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
            disabled={content.trim().length === 0}
          >
            피드백 보내기!
          </Button>
        </Col>
      </Form>
    </>
  );
};

export default Feedback;
