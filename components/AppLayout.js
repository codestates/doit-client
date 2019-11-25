import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Row, Col, Button, Divider } from 'antd';

import Header from './Header';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import TimelineAnchors from './TimelineAnchors';
import GoogleLoginButton from '../components/GoogleLoginButton';

const { Content } = Layout;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <Layout>
      <Header />

      <Content>
        <div className="wrapper">
          <Row>
            <Col xs={24} md={{ span: 8 }}>
              <div className="user">{me ? <UserProfile /> : <LoginForm />}</div>
              {me ? '' : <GoogleLoginButton />}
              <Button
                className="feedback"
                type="link"
                href="https://docs.google.com/forms/d/e/1FAIpQLScnUOEzRw9EvgVkLU8WKSidIlImg48gj_N8TB_rbsqF9thWbA/viewform?vc=0&c=0&w=1"
                target="_blank"
              >
                Feedback
              </Button>
              <TimelineAnchors />
              <Divider className="user-bottom-line" />
            </Col>
            <Col xs={24} md={{ span: 14, push: 2 }}>
              {children}
            </Col>
          </Row>
        </div>
      </Content>
      <style jsx global>{`
        .wrapper {
          max-width: 800px;
          width: 95%;
          margin: 0 auto;
          padding: 0 24px;
        }

        .ant-col > button {
          width: 100%;
        }

        button.ant-btn {
          margin-top: 5px;
          margin-bottom: 5px;
        }

        a.ant-btn {
          width: 100%;
        }

        div.user {
          margin: 20px 0;
          padding: 10px;
          background: #fff;
          border: 1px solid #ededed;
          border-radius: 4px;
          height: 120px;
          display: flex;
        }

        section.ant-layout {
          background: #fff;
          margin-bottom: 40px;
        }

        ul.ant-menu-horizontal {
          /* border: 0; */
        }

        textarea.ant-input {
          resize: none;
        }

        .user-bottom-line {
          margin: 30px 0;
        }
        @media (min-width: 768px) {
          .user-bottom-line {
            display: none;
          }
        }

        .feedback {
          background: rgba(0, 0, 0, 0.85);
          color: #fff;
          border: 0;
        }
        .feedback:hover {
          background: rgba(0, 0, 0, 0.7);
          color: #fff;
        }
      `}</style>
    </Layout>
  );
};

export default AppLayout;
