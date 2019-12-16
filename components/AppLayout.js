import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import Header from './Header';
import GlobalStyle from '../styles/GlobalStyle';

const { Content } = Layout;

const AppLayout = ({ children }) => (
  <Layout>
    <GlobalStyle />
    <Header />
    <Content>
      {children}
    </Content>
  </Layout>
);

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;
