import React from 'react';
import { Layout } from 'antd';

import Header from './Header';

const { Content } = Layout;

const AppLayout = ({ children }) => {

  return (
    <Layout>
      <Header />

      <Content className="wrapper">
        {children}
      </Content>
      <style jsx global>{`
        .wrapper {
          max-width: 800px;
          width: 95%;
          margin: 0 auto;
          padding: 0 24px;
        }

        .ant-col>button {
          width: 100%;
        }

        button.ant-btn {
          margin-top: 5px;
          margin-bottom: 5px;
        }

        a.ant-btn {
          width: 100%;
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
      `}</style>
    </Layout>
  );
};

export default AppLayout;
