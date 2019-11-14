import React, { useState } from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';

const { Header, Content } = Layout;

const DefaultLayout = ({ ...props }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <div className="logo" />
        <Row>
          <Col span={10}>
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
              <Menu.Item key="1">
                <Icon type="clock-circle" />
                <a href="/timer" style={{ display: 'inline' }}>
                  Timer
                </a>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="history" />
                <a href="/todohistory" style={{ display: 'inline' }}>
                  History
                </a>
              </Menu.Item>
            </Menu>
          </Col>
          <Col push={8} span={8}>
            {isLogin ? (
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="3" onClick="">
                  <Icon type="logout" />
                  Logout
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="user" />
                  Subin Ha
                </Menu.Item>
              </Menu>
            ) : (
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="3" onClick="">
                  <Icon type="login" />
                  <a href="/login" style={{ display: 'inline' }}>
                    Login
                  </a>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="user-add" />
                  <a href="/sign" style={{ display: 'inline' }}>
                    Signup
                  </a>
                </Menu.Item>
              </Menu>
            )}
          </Col>
        </Row>
      </Header>

      <Content {...props} />
    </Layout>
  );
};

const FullLayout = ({ ...props }) => (
  <Layout>
    <Content {...props} />
  </Layout>
);

export { DefaultLayout, FullLayout };
