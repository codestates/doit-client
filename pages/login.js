import React from 'react';
import styled from 'styled-components';
import Logo from '../components/Login/Logo';
import Inputs from '../components/Login/Inputs';
import SignGoogle from '../components/Login/SignGoogle';

const Layout = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(241 242 245);
`;

const login = () => (
  <Layout>
    <Logo />
    <Inputs />
    <SignGoogle />
  </Layout>
);

export default login;
