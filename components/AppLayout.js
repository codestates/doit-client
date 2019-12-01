import React from 'react';
import { Layout } from 'antd';

import Header from './Header';
import GlobalStyle from '../styles/GlobalStyle';

const { Content } = Layout;

const AppLayout = ({ children }) => {
  
  return (
    <Layout>
      <GlobalStyle />
      <Header />
      <Content>
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout;
