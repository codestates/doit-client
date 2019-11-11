import React from 'react';
import { Layout } from 'antd';

const DefaultLayout = ({ ...props }) => (
  <Layout style={{ height: '100vh' }}>
    <Layout.Header>​</Layout.Header>
    <Layout.Content {...props} />
    <Layout.Footer>​</Layout.Footer>
  </Layout>
);

const FullLayout = ({ ...props }) => (
  <Layout>
    <Layout.Content {...props} />
  </Layout>
);

export { DefaultLayout, FullLayout };
