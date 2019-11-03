import React from 'react';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = response => {
  console.log(response);
};

const Google = () => {
  return (
    <div>
      <GoogleLogin
        clientId={process.env.GOOGLE_LOGIN_API}
        buttonText="Login"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Google;
