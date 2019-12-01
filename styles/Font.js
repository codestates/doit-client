const Font = () => `
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 300;
    src: url('/static/fonts/noto-sans-kr-v12-korean_latin-300.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Light'), local('NotoSansKR-Light'),
        url('/static/fonts/noto-sans-kr-v12-korean_latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-300.woff2') format('woff2'), /* Super Modern Browsers */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-300.woff') format('woff'), /* Modern Browsers */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-300.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }
  
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url('/static/fonts/noto-sans-kr-v12-korean_latin-regular.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Regular'), local('NotoSansKR-Regular'),
        url('/static/fonts/noto-sans-kr-v12-korean_latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-regular.woff') format('woff'), /* Modern Browsers */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-regular.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }

  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src: url('/static/fonts/noto-sans-kr-v12-korean_latin-500.eot'); /* IE9 Compat Modes */
    src: local('Noto Sans KR Medium'), local('NotoSansKR-Medium'),
        url('/static/fonts/noto-sans-kr-v12-korean_latin-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-500.woff2') format('woff2'), /* Super Modern Browsers */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-500.woff') format('woff'), /* Modern Browsers */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
        url('/static/fonts/noto-sans-kr-v12-korean_latin-500.svg#NotoSansKR') format('svg'); /* Legacy iOS */
  }

  @font-face{
    font-family:'digital-clock-font';
    src: url('/static/fonts/digital-7.ttf');
  }

  *.ant-typography {
    word-break: keep-all;
  }

  div.ant-typography, .ant-typography p {
    font-size: 1.2em;
  }
`;

export default Font;
