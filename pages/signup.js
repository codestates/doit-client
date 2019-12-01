import React, { useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { Row, Col, Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../components/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { me } = useSelector((state) => state.user);
  const { isSigningUp, signUpError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (me) {
      Router.push('/index');
    }
    if (signUpError !== '') {
      message.error(signUpError);
    }
  }, [me && me.id, signUpError]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          email: id,
          nickname,
          password,
        },
      });
    },
    [id, nickname, password],
  );

  const onChangePasswordCheck = (e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  };

  return (
    <Form className="signup" onSubmit={onSubmit}>
      <Row>
        <Col>
          <label htmlFor="user-id">
            E-mail
            <Input
              type="email"
              name="user-id"
              value={id}
              required
              onChange={onChangeId}
            />
          </label>
        </Col>
        <Col>
          <label htmlFor="user-nick">
            Nickname
            <Input
              name="user-nick"
              value={nickname}
              required
              onChange={onChangeNickname}
            />
          </label>
        </Col>
        <Col>
          <label htmlFor="user-password">
            Password
            <Input
              type="password"
              name="user-password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </label>
        </Col>
        <Col>
          <label htmlFor="user-password-check">
            Confirm password
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
          {passwordError && (
            <div style={{ color: 'red' }}>Password is not correct.</div>
          )}
          </label>
        </Col>
        <Col>
          <Button className="btn-signup" type="primary" htmlType="submit" loading={isSigningUp}>
            Signup
          </Button>
        </Col>
      </Row>
      <style jsx global>{`
        .signup>div {
          margin-top: 20px;
          width: 100%;
        }
        .signup .ant-col:last-child {
          margin-top: 20px;
        }
      `}</style>
    </Form>
  );
};

export default Signup;
