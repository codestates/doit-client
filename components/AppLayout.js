import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Menu, Input, Row, Col, Icon } from 'antd';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/index">
            <a>
              <Icon type="home" />
              Home
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="history">
          <Link href="/todohistory">
            <a>
              <Icon type="history" />
              History
            </a>
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="search">
          <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
        </Menu.Item> */}
      </Menu>
      <Row>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={18}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default AppLayout;
