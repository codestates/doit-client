import { createGlobalStyle } from 'styled-components';
import Font from './Font';
import Button from './Button';
import Card from './Card';

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color:inherit;
  }
  
  body {
    background: #ededed;
    font-family: 'Noto Sans KR', sans-serif;
  }

  .container {
    max-width: 1024px;
    width: 95%;
    margin: 0 auto;
    padding: 0 24px;

    @media (max-width: 767px) {
      padding: 0;
    }
  }
  
  section.ant-layout {
    background: #ededed;
  }

  ul.ant-menu-horizontal {
    border: 0;
  }
  
  textarea.ant-input {
    resize: none;
  }

  ${Font}
  ${Button}
  ${Card}
`;

export default GlobalStyle;
