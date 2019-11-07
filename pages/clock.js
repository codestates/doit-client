import React from 'react';
import styled from 'styled-components';
import Timer from '../components/Timer';
const Main = styled.div`
  margin: auto;
  height: 500px;
  width: 700px;
  text-align: center;
  border: 3px solid coral;
`;

const clock = () => (
  <Main>
    <Timer />
  </Main>
);

export default clock;
