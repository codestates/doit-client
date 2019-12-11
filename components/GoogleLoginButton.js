import React from 'react';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { GOOGLE_CLIENT_ID } from '../config/key.json';
import { GOOGLE_AUTH_REQUEST } from '../reducers/user';

const StyledGoogleLogin = styled(GoogleLogin)`
  display: flex;
  justify-content: center;
  width: max-content;
  padding: 5px 10px !important;
  border-radius: 4px !important;

  & > * {
    display: flex;
    color: #252525;
    font-size: 18px !important;
    font-weight: 400 !important;
  }
`;

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const responseSuccess = (response) => {
    // console.log(response);
    // eslint-disable-next-line camelcase
    const { id_token } = response.tokenObj;
    dispatch({
      type: GOOGLE_AUTH_REQUEST,
      data: {
        token: id_token,
      },
    });
    Router.push('/timer');
  };
  // eslint-disable-next-line no-unused-vars
  const responseFail = (response) => {
    // console.log(response);
  };
  return (
    <StyledGoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="지금 바로 두잇하기"
      longtitle="true"
      onSuccess={responseSuccess}
      onFailure={responseFail}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
