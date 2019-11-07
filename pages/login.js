import React from 'react';
import Logo from '../components/LoginSign/Logo';
import InputButton from '../components/LoginSign/InputButton';
import SignGoogle from '../components/LoginSign/SignGoogle';

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
