import React from 'react';
import Logo from '../components/Login/Logo';
import InputButton from '../components/Login/InputButton';
import Sign from '../components/Login/Sign';

const login = props => {
  return (
    <div>
      <Logo />
      <InputButton />
      <Sign />
    </div>
  );
};

export default login;
