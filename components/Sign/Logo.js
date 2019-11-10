import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';

const Main = styled.div`
  position: absolute;
  left: 0;
  top: 25px;
  height: 100px;
  width: 100%;
  color: #0275d8;
  text-align: center;
`;

const Logo = () => {
  return (
    <div>
      <Main>
        <Link href="/">
          <a style={{ cursor: 'pointer', fontSize: '3.2rem' }}>Do it</a>
        </Link>
        <h2 style={{ marginTop: '60px' }}>회원가입 페이지</h2>
      </Main>
    </div>
  );
};

export default Logo;
