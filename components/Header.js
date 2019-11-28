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
  font-weight: 600;
`;

const MenuItem = styled(Menu.Item)`
  &:hover {
    border-bottom: 2px solid transparent !important;
  }
`;

const HeaderComponent = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <StyledHeader>
      <div className="container">
        <Link href="/">
          <a>
            <Logo>
              두잇
            </Logo>
          </a>
        </Link>
        {me ? (
          <>
            <Menu mode="horizontal" defaultSelectedKeys="1" style={{ float: 'left' }} >
              <MenuItem key="1">
                <Link href="/">
                  <a>
                    <Icon type="clock-circle" />
                    타이머
                  </a>
                </Link>
              </MenuItem>
              <MenuItem key="2">
                <Link href="/todohistory">
                  <a>
                    <Icon type="history" />
                    히스토리
                  </a>
                </Link>
              </MenuItem>
            </Menu>
            <Menu mode="horizontal" style={{float: 'right'}} >
              <MenuItem key="3">
                <Icon type="logout" />
                <LogoutBtn />
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Menu mode="horizontal" style={{ float: 'right' }}>
            <MenuItem key="4">
              <GoogleLoginButton />
            </MenuItem>
          </Menu>
        )}
        {!me && <LoginForm />}
      </div>
    </StyledHeader>
  );
};

export default HeaderComponent;
