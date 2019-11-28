import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Icon, Switch } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import GoogleLoginButton from './GoogleLoginButton';
import LogoutBtn from './LogoutBtn';
import LoginForm from './LoginForm';
import { TOGGLE_SOUND_ON_OFF } from '../reducers/timer';

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
  margin: auto 30px auto 5px;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const MenuItem = styled(Menu.Item)`
  border-bottom: 2px solid transparent !important;

  &:hover {
    border-bottom: 2px solid transparent !important;
  }
`;

const HeaderComponent = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onChangeSound = (checked) => {
    dispatch({
      type: TOGGLE_SOUND_ON_OFF,
      data: checked,
    });
  };

  return (
    <StyledHeader>
      <div className="container">
        <Link href="/">
          <a>
            <Logo>두잇</Logo>
          </a>
        </Link>
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
            <Menu mode="horizontal" style={{ float: 'right' }}>
              <MenuItem key="3">
                <Switch size="small" defaultChecked onChange={onChangeSound} />{' '}
                소리 켬/끔  
              </MenuItem>
              <MenuItem key="4">
                <Icon type="logout" />
                <LogoutBtn />
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Menu mode="horizontal" style={{ float: 'right' }}>
            <MenuItem key="5">
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
