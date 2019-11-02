import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Main = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: lightgray;
`;
const Button = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 3rem;
  height: 200px;
  width: 300px;
`;


const Home = () => (
  <Main>
    <Link href="/login">
      <Button className="btn btn-outline-primary">Do it!</Button>
    </Link>
  </Main>
);

export default Home;
