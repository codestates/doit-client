import React from 'react';
import { Button, Row, Col } from 'antd';
import styled from 'styled-components';

const MaiinFrame = styled.div`
  margin-top: 120px;
`;

const TutoDiv = styled.div`
  margin: 100px 0;
  height: 280px;
  text-align: center;
`;

const Tutorial = () => {
  return (
    <MaiinFrame>
      <TutoDiv>
        <iframe
          width="550"
          height="400"
          align="center"
          src="https://www.youtube.com/embed/XFU_Fuf00V0"
        ></iframe>
      </TutoDiv>
    </MaiinFrame>
  );
};

export default Tutorial;
