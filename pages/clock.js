import React from 'react';
import styled from 'styled-components';
import Timer from '../components/Timer';
const Main = styled.div`
  margin: auto;
  height: auto;
  width: 350px;
  text-align: center;
  color: blue;;
`;

const clock = () => (
  <Main>
    <Timer />
  </Main>
);

export default clock;
