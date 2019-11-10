import React from 'react';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  text-align: center;
`;

const responseGoogle = response => {
  console.log(response);
};

const Google = () => {
  console.log('test', process.env.GOOGLE_LOGIN_API);
  return (
    <Container>
      <GoogleLogin
        clientId={process.env}
        buttonText="Goolge 로그인"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        style={{ width: '350px' }}
      />
    </Container>
  );
};

export default Google;
