import React from 'react';
import Logo from '../components/Sign/Logo';
import Form from '../components/Sign/Form';

const sign = props => {
  console.log(props);
  return (
    <div>
      <Logo />
      <Form />
    </div>
  );
};

export default sign;
