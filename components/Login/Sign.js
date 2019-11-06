import React from 'react';
import styled from 'styled-components';
import Google from './Google';

const Main = styled.div`
  position: relative;
  text-align: center;
  top: 210px;
  width: 350px;
  height: auto;
  margin: auto;
`;

const Sign = () => {
  return (
    <Main>
      <Google />
    </Main>
  );
};

export default Sign;
