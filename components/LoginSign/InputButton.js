import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

const Main = styled.div`
  position: relative;
  top: 200px;
  width: 350px;
  height: auto;
  margin: auto;
`;

const InputEmail = styled.input.attrs({ placeholder: '이메일을 입력해주세요' })`
  position: relative;
  height: 45px;
  width: 350px;
`;

const InputPassword = styled.input.attrs({
  placeholder: '비밀번호를 입력해주세요',
  type: 'password'
})`
  position: relative;
  top: 3px;
  height: 45px;
  width: 350px;
  margin-bottom: 20px;
`;

const Btn = styled.button`
  position: relative;
  top: 0px;
  height: 45px;
  width: 350px;
  margin-bottom: 5px;
`;

const loginHandler = () => {
  Router.push('/timer');
};
const signHandler = () => {
  Router.push('/sign');
};

const Inputs = () => {
  return (
    <Main>
      <InputEmail />
      <InputPassword />
      <Btn onClick={() => loginHandler()}>Login</Btn>
      <Btn onClick={() => signHandler()}>Sign</Btn>
    </Main>
  );
};

export default Inputs;
