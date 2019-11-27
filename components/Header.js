import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';

import GoogleLoginButton from './GoogleLoginButton';
import LogoutBtn from './LogoutBtn';

const { Header } = Layout;

const HeaderComponent = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <Header>
      <div className="wrapper">
        {me ? (
          <Menu mode="horizontal">
            <Menu.Item key="home">
              <Link href="/index">
                <a>
                  <Icon type="clock-circle" />
                  Timer
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
            <Menu.Item style={{ float: 'right' }} key="logout">
              <Icon type="logout" />
              <LogoutBtn />
            </Menu.Item>
          </Menu>
        ) : (
          <Menu mode="horizontal">
            <Menu.Item style={{ float: 'right' }} key="login">
              <GoogleLoginButton />
            </Menu.Item>
          </Menu>
        )}
      </div>
      <style jsx global>{`
          header.ant-layout-header {
            background: #fff;
            height: auto;
            padding: 0;
          }
      `}</style>
    </Header>
  );
};

export default HeaderComponent;
