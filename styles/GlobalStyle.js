import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);

  a {
    text-decoration: none;
    color:inherit;
  }
  
  body {
    background: #fafafa;
    font-family: 'Spoqa Han Sans', 'Sans-serif';
  }

  .container {
    max-width: 1024px;
    width: 95%;
    margin: 0 auto;
    padding: 0 24px;
  }

  section.ant-layout {
    background: #fafafa;
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
