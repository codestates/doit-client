import React, { useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import axios from 'axios';
import { Icon, Button, Input } from 'antd';

const Main = styled.div`
  position: relative;
  top: 200px;
  width: 350px;
  height: auto;
  margin: auto;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  text-align: center;
  margin-top: 10px;
`;

const idHandler = init => {
  const [value, setValue] = useState(init);
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };
  return { value, onChange };
};
const pinHandler = init => {
  const [value, setValue] = useState(init);
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };
  return { value, onChange };
};

const loginHandler = async (id, pin) => {
  if (!id && !pin) {
    alert('정보 입력 부탁해요');
    return;
  }
  if (!pin) {
    alert('password 입력 부탁해요');
    return;
  }
  await axios
    .post(
      'https://api.mygraphr.com/api/user/login',
      { email: id, password: pin },
      { credentials: true },
    )
    .then(
      response => {
        // response 처리해야 함
        Router.push({
          pathname: '/timer',
          query: { nickname: response.data.data.nickname },
        });
      },
      error => {
        console.log(error);
        alert('잘못된 정보입니다.');
      },
    );
};

const signHandler = () => {
  Router.push('/sign');
};

const Inputs = () => {
  let useId = idHandler('');
  let id = useId.value;
  let usePin = pinHandler('');
  let pin = usePin.value;

  return (
    <Main>
      <Input
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="e-mail"
        {...useId}
      />
      <Input
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="password"
        type="password"
        {...usePin}
      />
      <Container>
        <Button type="primary" onClick={() => loginHandler(id, pin)}>
          Login
        </Button>
      </Container>
      <Container>
        <Button type="primary" onClick={() => signHandler()}>
          Sign
        </Button>
      </Container>
    </Main>
  );
};

export default Inputs;
