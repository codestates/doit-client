import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 300;
    src: url('/fonts/noto-sans-kr-v12-korean_latin-300.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Light'), local('NotoSansKR-Light'),
        url('/fonts/noto-sans-kr-v12-korean_latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/noto-sans-kr-v12-korean_latin-300.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/noto-sans-kr-v12-korean_latin-300.woff') format('woff'), /* Modern Browsers */
        url('/fonts/noto-sans-kr-v12-korean_latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/noto-sans-kr-v12-korean_latin-300.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }
  
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/noto-sans-kr-v12-korean_latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Regular'), local('NotoSansKR-Regular'),
        url('/fonts/noto-sans-kr-v12-korean_latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/noto-sans-kr-v12-korean_latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/noto-sans-kr-v12-korean_latin-regular.woff') format('woff'), /* Modern Browsers */
        url('/fonts/noto-sans-kr-v12-korean_latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/noto-sans-kr-v12-korean_latin-regular.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/noto-sans-kr-v12-korean_latin-500.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Medium'), local('NotoSansKR-Medium'),
        url('/fonts/noto-sans-kr-v12-korean_latin-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/fonts/noto-sans-kr-v12-korean_latin-500.woff2') format('woff2'), /* Super Modern Browsers */
        url('/fonts/noto-sans-kr-v12-korean_latin-500.woff') format('woff'), /* Modern Browsers */
        url('/fonts/noto-sans-kr-v12-korean_latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/fonts/noto-sans-kr-v12-korean_latin-500.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }

  @font-face{
    font-family:'digital-clock-font';
    src: url('/fonts/digital-7.ttf');
  }

  a {
    text-decoration: none;
    color:inherit;
  }
  
  body {
    background: #fafafa;
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
    background: #fafafa;
  }

  button.ant-btn {
    width: 100%;
    margin-bottom: 10px;
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

  .ant-card {
    margin-bottom: 20px;
    border-radius: 4px;
    border-color: #d9d9d9;

    & .ant-card-head {
      background: #F8D755;

      & .ant-card-head-title {
        font-weight: 400;
      }
    }
    
    & .ant-card-body {
      padding: 0;

      & > textarea {
        border: 0;
        padding: 4px 24px;
        border-radius: 0 0 4px 4px;

        background-attachment: local;
        background-image:
          linear-gradient(to right, white 20px, transparent 10px),
          linear-gradient(to left, white 20px, transparent 10px),
          repeating-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px);
        line-height: 31px;
        
        &:disabled {
          color: #252525;
          background-image:
            linear-gradient(to right, #f5f5f5 20px, transparent 10px),
            linear-gradient(to left, #f5f5f5 20px, transparent 10px),
            repeating-linear-gradient(#f5f5f5, #f5f5f5 30px, #ccc 30px, #ccc 31px, gray 31px);
        }
      }
    }
  }
`;

export default GlobalStyle;
