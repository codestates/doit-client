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
  color: black;
  text-align: center;
`;


const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Main>
          <span  style={{ cursor: 'pointer' }}>
            Do it!
          </span>
        </Main>
      </Link>
    </div>
  );
};

export default Logo;
