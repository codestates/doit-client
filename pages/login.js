import React from 'react';
import Logo from '../components/Login/Logo';
import InputButton from '../components/Login/InputButton';
import SignGoogle from '../components/Login/SignGoogle';

const login = props => {
  console.log('test', process.env.GOOGLE_LOGIN_API)
  return (
    <div>
      <Logo />
      <InputButton />
      <SignGoogle />
    </div>
  );
};

export default login;
