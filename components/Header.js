import React, { useEffect } from 'react';
import Link from 'next/link';
import { Layout, Menu, Modal } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Howl } from 'howler';

import BtnLogout from './BtnLogout';
import { TODO_PAUSE_REQUEST } from '../reducers/timer';
import messages from '../config/messages';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  height: auto;
  padding: 0;
  border-bottom: 1px solid #d9d9d9;

  & .ant-menu-item {
    padding: 0 10px;
    display: inline-block !important;

    &.ant-menu-item-selected > a,
    &.ant-menu-item-selected > button,
    & > a:hover,
    & > a:focus,
    & > button:hover,
    & > button:focus {
      color: #252525;
    }
  }

  & .ant-menu-submenu {
    display: none !important;
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
  const { totalTime, elapsedTime, isSoundOn } = useSelector(
    (state) => state.timer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (totalTime === elapsedTime) {
      dispatch({
        type: TODO_PAUSE_REQUEST,
      });
      const sound = new Howl({
        src: ['/static/sounds/Christmas_Village_64.mp3'],
        onplayerror: function() {
          sound.once('unlock', function() {
            sound.play();
          });
        },
      });
      if (isSoundOn) {
        sound.play();
      }
      Modal.success({
        title: messages.timerEnd,
        onOk() {
          sound.stop();
        },
      });
    }
  }, [totalTime, elapsedTime, dispatch, isSoundOn]);

  return (
    <StyledHeader>
      <div className="container">
        {me && (
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
                  <a>기록 보기</a>
                </Link>
              </MenuItem>
            </Menu>
            <Menu mode="horizontal" style={{ float: 'right' }}>
              <MenuItem key="3">
                <BtnLogout />
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </StyledHeader>
  );
};

export default HeaderComponent;
