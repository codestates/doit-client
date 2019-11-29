import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import GoogleLoginButton from './GoogleLoginButton';
import BtnLogout from './BtnLogout';
import LoginForm from './LoginForm';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  height: auto;
  padding: 0;
  border: 1px solid #d9d9d9;

  & .ant-menu-item {
    padding: 0 10px;

    &.ant-menu-item-selected>a,
    &>a:hover,
    &>a:focus,
    &>button:hover,
    &>button:focus {
      color: #252525;
    }
  }
`;

const Logo = styled.h1`
  float: left;
  height: 46px;
  margin: auto;
  display: flex;
  align-items: center;
  font-weight: 500;
`;

const MenuItem = styled(Menu.Item)`
  border-bottom: 2px solid transparent !important;

  &:hover {
    border-bottom: 2px solid transparent !important;
  }
`;

const HeaderComponent = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <StyledHeader>
      <div className="container">
        {me ? (
          <>
            <Menu
              mode="horizontal"
              defaultSelectedKeys="1"
              style={{ float: 'left' }}
            >
              <MenuItem key="1">
                <Link href="/">
                  <a>
                    <Logo>두잇</Logo>
                  </a>
                </Link>
              </MenuItem>
              <MenuItem key="2">
                <Link href="/todohistory">
                  <a>
                    {/* <Icon type="history" /> */}
                    기록 보기
                  </a>
                </Link>
              </MenuItem>
            </Menu>
            <Menu mode="horizontal" style={{ float: 'right' }}>
              <MenuItem key="3">
                <BtnLogout />
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
