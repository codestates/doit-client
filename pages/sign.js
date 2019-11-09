import React from 'react';
import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;
import Logo from '../components/Sign/Logo';
import Form from '../components/Sign/Inputs';

const sign = props => {
  console.log(props);
  return (
    <Layout>
      <Logo />
      <Content>
        <Form />
      </Content>
    </Layout>
  );
};

export default sign;
