import React from 'react';
import FacebookLoginWithButton from 'react-facebook-login';


const responseFacebook = response => {
  console.log(response);
};

const componentClicked = () => {
  console.log('Clicked!');
};

export default function App() {
  return (
    <FacebookLoginWithButton
      appId={process.env.FACEBOOK_LOGIN_API}
      autoLoad
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      icon="fa-facebook"
    />
  );
}