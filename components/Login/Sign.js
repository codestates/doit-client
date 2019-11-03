import React from 'react';
import styled from 'styled-components';
import Facebook from './Facebook';

const Main = styled.div`
  position: relative;
  text-align: center;
  top: 220px;
  width: 350px;
  height: auto;
  margin: auto;
  border: 1px solid coral;
`;


const Sign = () => {
  return (
    <Main>
      <Facebook styled={{width: '350px'}}/>
    </Main>
  );
};

export default Sign;
