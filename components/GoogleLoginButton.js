import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginButton = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <GoogleLogin
      clientId="88835068458-89fvsmndtj2kememi970thfpq9p9i0tt.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
