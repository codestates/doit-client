import React from 'react';
import Logo from '../components/Login/Logo';
import Inputs from '../components/Login/Inputs';
import SignGoogle from '../components/Login/SignGoogle';

import styled from 'styled-components';

const Layout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(241 242 245);
`;

const login = props => {
  return (
    <Layout>
      <Logo />
      <Inputs />
      <SignGoogle />
    </Layout>
  );
};

export default login;
