import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal, Row, Col } from 'antd';
import Information from '../components/Intro/Information';
import Tutorial from '../components/Intro/Tutorial';

const DoitDiv = styled.div`
  position: relative;
  font-size: 2rem;
  top: 30px;
  padding: 25px;
  border-bottom: 2px solid lightblue;
`;

const InfoTutoDiv = styled.div`
  position: relative;
  top: 60px;
  padding: 25px;
  font-size: 2rem;
`;

const intro = () => {
  return (
    <div>
      <div>
        <DoitDiv>
          <span style={{ fontSize: '5rem' }}>DO IT</span>
          <br />
          <span>업무에서 여가까지 집중하는 생활</span>
        </DoitDiv>
      </div>
      <div>
        <InfoTutoDiv>Infomation</InfoTutoDiv>
        <Information />
      </div>
      <div>
        <InfoTutoDiv>Tutorial</InfoTutoDiv>
        <Tutorial />
      </div>
    </div>
  );
};

export default intro;
