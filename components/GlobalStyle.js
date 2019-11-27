import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color:inherit;
  }

  .container {
    max-width: 1024px;
    width: 95%;
    margin: 0 auto;
    padding: 0 24px;
  }

  section.ant-layout {
    background: #fff;
  }

  .ant-col > button {
    width: 100%;
  }

  button.ant-btn {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  a.ant-btn {
    width: 100%;
  }
  
  ul.ant-menu-horizontal {
    border: 0;
  }

  textarea.ant-input {
    resize: none;
  }
`;

export default GlobalStyle;
