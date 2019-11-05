import * as React from 'react';

import { Layout, Menu, Breadcrumb, Icon, Button, Col } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import styled from 'styled-components';
import Link from 'next/link';

const InputTodo = styled.input.attrs({
  placeholder: '할 일을 입력해주세요'
})`
  position: relative;
  top: 3px;
  height: 45px;
  width: 350px;
  font-size: 2rem;
`;

const InputDone = styled.input.attrs({
  placeholder: '한 일을 입력해주세요'
})`
  position: relative;
  top: 3px;
  height: 45px;
  width: 350px;
  font-size: 2rem;
`;

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
        <Layout>
          {/* 1. col로 바꾼다 */}
          <Sider width={450} style={{ background: '#fff', height: '600px' }}>
            <Menu
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              {/* 2.사이즈를 강제하는 걸 알아본다 */}
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    타이머
                  </span>
                }
              >
                <Menu.Item key="1">시간</Menu.Item>
                <Menu.Item
                  key="2"
                  style={{ height: '100px', textAlign: 'center' }}
                >
                  <h1 style={{ color: 'white', fontSize: '3rem' }}>60:00</h1>
                </Menu.Item>
              </SubMenu>

              <Menu.Item>
                <Icon type="clock-circle" />
                timer
              </Menu.Item>
              <div
                style={{
                  fontSize: '5rem',
                  textAlign: 'center'
                }}
              >
                <h1 style={{ color: 'white' }}>
                  {/* 
                우선순위 최하 layout을 80%는 끝내고 진행
                기본시간은 60분이다.
                스타트를 하는 동안에는 시간을 설정 할 수 없다.
                스타트를 하면 pause로 버튼이 바뀐다.
                시간을 시간설정에서 설정 할 수 있다 
                리셋을 하면 60분이 된다.
                60분을 마치면 완료와 함께 complete과 함께 메시지 입력이 가능하다
                */}
                  60:00
                </h1>
                <h2 style={{ textAlign: 'center' }}>
                  {/* 3. 사이즈 연구 */}

                  <br />
                  <Button>start</Button>
                  <Button>reset</Button>
                </h2>
              </div>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="setting" />
                    설정
                  </span>
                }
              >
                <Menu.Item key="3">시간 설정</Menu.Item>
              </SubMenu>
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
              <InputTodo></InputTodo>
              {/* after timer */}
              <br />
              <br />
              <br />
              <h3>Done</h3>
              <InputDone></InputDone>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

// import { Breadcrumb, Icon } from 'antd';

// ReactDOM.render(
//   <Breadcrumb>
//     <Breadcrumb.Item href="">
//       <Icon type="home" />
//     </Breadcrumb.Item>
//     <Breadcrumb.Item href="">
//       <Icon type="user" />
//       <span>Application List</span>
//     </Breadcrumb.Item>
//     <Breadcrumb.Item>Application</Breadcrumb.Item>
//   </Breadcrumb>,
//   mountNode,
// );
