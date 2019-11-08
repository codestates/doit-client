import React from 'react';
import axios from 'axios';

const write = () => {
  return <div>wirte page 입니다.</div>;
};

wriite.getInitialProps = async () => {
  const res = await axios({
    method: 'post',
    url: 'http://SERVER-IP-PORT/api/todo'
    // params: { query:  }
  });
};
export default write;
