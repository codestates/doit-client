import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';

const Main = styled.div`
  position: absolute;
  left: 0;
  top: 25px;
  height: 100px;
  width: 100%;
  font-size: 3.2rem;
  color: #0275d8;
  text-align: center;
`;

const Logo = () => {
  return (
    <div>
      <Main>
        <span style={{ cursor: 'pointer' }}>회원가입</span>
      </Main>
    </div>
  );
};

export default Logo;
