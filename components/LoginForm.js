import React, { useCallback } from 'react';
import { Row, Col, Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import useInput from './useInput';
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { isLoggingIn } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: LOG_IN_REQUEST,
      data: {
        email: id,
        password,
      },
    });
  }, [id, password, dispatch]);

  return (
    <Form onSubmit={onSubmitForm}>
      <Row type="flex" justify="space-between" align="middle">
        <Col xs={16}>
          <label htmlFor="user-id">
            <Input type="email" name="user-id" value={id} onChange={onChangeId} placeholder="E-mail" required />
          </label>
          <label htmlFor="user-password">
            <Input type="password" name="user-password" value={password} onChange={onChangePassword} placeholder="Password" required />
          </label>
        </Col>

        <Col xs={7}>
          <Button className="btn-login" type="primary" htmlType="submit" loading={isLoggingIn}>
            Login
          </Button>
        </Col>
      </Row>
      <style jsx global>{`
        form.ant-form {
          display: flex;
          width: 100%;
        }
        form.ant-form>div {
          width: 100%;
        }
        form.ant-form input {
          margin: 5px 0;
        }
        .btn-login {
          height: 73px;
          margin: 5px 0;
        }
      `}</style>
    </Form>
  );
};

export default LoginForm;
