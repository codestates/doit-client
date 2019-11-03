import React from 'react';
import styled from 'styled-components';
import Facebook from './Facebook';

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
  placeholder: '비밀번호를 입력해주세요'
})`
  position: relative;
  top: 3px;
  height: 45px;
  width: 350px;
`;

const Btn = styled.button`
  position: relative;
  top: 0px;
  margin-top: 20px;
  height: 45px;
  width: 350px;
`;

const Inputs = () => {
  return (
    <Main>
      <InputEmail />
      <InputPassword />
      <Btn className="btn btn-outline-primary">Login</Btn>
    </Main>
  );
};

export default Inputs;
