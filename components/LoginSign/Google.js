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
  return (
    <Container>
      <GoogleLogin
        clientId="46549852410-4uq3dof4qcmhfrlrif6gr9itr0mdpckb.apps.googleusercontent.com"
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
