import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;

const HeaderComponent = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <Header>
      <div className="wrapper">
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
          {!me && (
            <Menu.Item key="signup">
              <Link href="/signup">
                <a>
                  <Icon type="user-add" />
                  Signup
                </a>
              </Link>
            </Menu.Item>
          )}
        </Menu>    
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
