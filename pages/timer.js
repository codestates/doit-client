import * as React from 'react';
import Link from 'next/link';

import { Layout, Menu, Breadcrumb, Icon, Button, Input, Col } from 'antd';
import styled from 'styled-components';
const { Header, Content, Sider } = Layout;
// const { SubMenu } = Menu;
// const InputTodo = styled.input.attrs({
//   placeholder: '할 일을 입력해주세요'
// })`
//   position: relative;
//   top: 3px;
//   height: 45px;
//   width: 350px;
//   font-size: 2rem;
// `;

// const InputDone = styled.input.attrs({
//   placeholder: '한 일을 입력해주세요'
// })`
//   position: relative;
//   top: 3px;
//   height: 45px;
//   width: 350px;
//   font-size: 2rem;
// `;

const ButtonTest = () => {
  console.log('a');
};

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        {/* <style dangerouslySetInnerHTML={{ __html: stylesheet }} /> */}
        {/* styled component */}
        <style jsx>{`
          #components-layout-demo-top-side-2 .logo {
            width: 120px;
            height: 31px;
            background: #333;
            border-radius: 6px;
            margin: 16px 28px 16px 0;
            float: left;
          }
        `}</style>
        {/* 헤더시작 */}
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <span>
                <Icon type="user" />
                user
              </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="hourglass" />
              History
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="setting" />
              Setting
            </Menu.Item>
            <Menu.Item key="4">
              <Link href="/login">Login</Link>
            </Menu.Item>
          </Menu>
        </Header>
        {/* 헤더 끝 */}
        <Layout>
          {/* 1. col로 바꾼다 */}
          {/* 2. 그대로 둔다. */}
          <Sider width={450} style={{ background: '#fff', height: '600px' }}>
            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <Menu.Item>
                <Icon type="clock-circle" />
                timer
              </Menu.Item>
              <div style={{ textAlign: 'center' }}>
                
              </div>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Button onClick={ButtonTest} type="danger">
                danger
              </Button>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              {/* TO do list */}
              {/* 입력 끝났을 때 처리 */}
              <h3>To do</h3>
              <Input></Input>
              <h3>Done</h3>
              <Input></Input>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
