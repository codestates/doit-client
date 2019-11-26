import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';

import { GOOGLE_CLIENT_ID } from '../config/key.json';
import { GOOGLE_AUTH_REQUEST } from '../reducers/user';

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const responseSuccess = (response) => {
    console.log(response);
    const { id_token } = response.tokenObj;
    dispatch({
      type: GOOGLE_AUTH_REQUEST,
      token: id_token,
    });
  };
  const responseFail = (response) => {
    console.log(response);
  };
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Login"
      onSuccess={responseSuccess}
      onFailure={responseFail}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
