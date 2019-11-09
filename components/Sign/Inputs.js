import React, { useState } from 'react';
import { Form, Col, Row, Icon, Button, Input } from 'antd';
import styled from 'styled-components';
import Router from 'next/router';
import axios from 'axios';

const FormBox = styled.div`
  position: relative;
  height: auto;
  width: 300px;
  margin: 240px auto;
`;

const nickHandler = init => {
  const [value, setValue] = useState(init);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };
  return { value, onChange };
};
const idHandler = init => {
  const [value, setValue] = useState(init);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };
  return { value, onChange };
};
const pinHandler = init => {
  const [value, setValue] = useState(init);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };
  return { value, onChange };
};

const submitHandler = async (nick, id, pin) => {
  await axios({
    method: 'post',
    url: 'http://15.164.163.120:8085/api/user/signup',
    headers: {},
    data: {
      email: id,
      nickname: nick,
      password: pin
    }
  }).then(
    response => {
      // response 처리해야 함
      Router.push('/login');
    },
    error => {
      console.log(error)
      alert('중복되는 아이디입니다.');
    }
  );
};
const Inputs = () => {
  let useNick = nickHandler('');
  let nick = useNick.value;
  let useId = idHandler('');
  let id = useId.value;
  let usePin = pinHandler('');
  let pin = usePin.value;

  return (
    <FormBox>
      <Form>
        <Form.Item label="닉네임">
          <Input
            prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="nickname"
            {...useNick}
          />
        </Form.Item>
        <Form.Item label="아이디">
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="e-mail"
            {...useId}
          />
        </Form.Item>
        <Form.Item label="비밀번호">
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="password"
            {...usePin}
            type="password"
          />
        </Form.Item>
        <Button onClick={() => submitHandler(nick, id, pin)}>완료</Button>
      </Form>
    </FormBox>
  );
};

export default Inputs;
