import React, { useState, useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import useInput from '../components/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const { me } = useSelector((state) => state.user);
  const { isSigningUp } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (me) {
      Router.push('/index');
    }
  }, [me && me.id]);

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
    <>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">E-mail</label>
          <br />
          <Input
            type="email"
            name="user-id"
            value={id}
            required
            onChange={onChangeId}
          />
        </div>
        <div>
          <label htmlFor="user-nick">Nickname</label>
          <br />
          <Input
            name="user-nick"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input
            type="password"
            name="user-password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">Confirm password</label>
          <br />
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
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>
            Signup
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Signup;
