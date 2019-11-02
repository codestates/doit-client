import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';

const Main = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100px;
  width: 100%;
  font-size: 3.2rem;
  color: white;
  text-align: center;
`;

const Logo = () => {
  return (
    <Link href='/'>
      <Main className="bg bg-primary">Do it!</Main>
    </Link>
  );
};

export default Logo;
