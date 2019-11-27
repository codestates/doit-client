import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import GoogleLoginButton from './GoogleLoginButton';
import LogoutBtn from './LogoutBtn';
import LoginForm from './LoginForm';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  height: auto;
  padding: 0;
  border: 1px solid #ededed;
`;

const Logo = styled.h1`
  float: left;
  height: 46px;
  margin: auto 10px;
  display: flex;
  align-items: center;
`;

const HeaderComponent = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <StyledHeader>
      <div className="wrapper">
        <Link href="/">
          <a>
            <Logo>
              DO IT
            </Logo>
          </a>
        </Link>
        {me ? (
          <Menu style={{ float: 'right' }} mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="2">
              <Link href="/todohistory">
                <a>
                  <Icon type="history" />
                  History
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="logout" />
              <LogoutBtn />
            </Menu.Item>
          </Menu>
        ) : (
          <Menu mode="horizontal" style={{ float: 'right' }}>
            <Menu.Item key="4">
              <GoogleLoginButton />
            </Menu.Item>
          </Menu>
        )}
        {!me && <LoginForm />}
      </div>
    </StyledHeader>
  );
};

export default HeaderComponent;
