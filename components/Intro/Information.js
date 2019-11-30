import React from 'react';
import styled from 'styled-components';

// left right 로 나누는 방법

const MainFrame = styled.div`
  margin-top: 120px;
  @media (max-width: 768px) {
    text-align: center;
    margin: 200px auto;
  }
`;

const InfoDiv = styled.div`
  padding: 25px;
  margin: 10px 0 0 0;
  font-size: 1.5rem;
  /* border: 1px solid slateblue; */
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 30px auto auto auto;
  }
`;

const BorderBottomLine = styled.div`
  border-bottom: 2px solid lightblue;
`;

const PomoImg = styled.img`
  position: relative;
  left: 130px;
  content: url();
  height: auto;
  width: 170px;
  @media (max-width: 768px) {
    left: 0;
    flex-direction: column;
    margin: 30px auto auto auto;
  }
`;

const TextInfoBox = styled.div`
  padding: 10px 0 0 20px;
  margin: auto;
  font-size: 1rem;
`;

const Information = () => {
  return (
    <MainFrame>
      <InfoDiv>
        <span>포모도로에 대해 들어보셨나요?</span>
        <span>
          <PomoImg />
        </span>
      </InfoDiv>
      <BorderBottomLine />
      <InfoDiv>
        <span>
          <span>&#8729;</span> 포모도로와 두잇
        </span>
        <TextInfoBox>
          <p>-포모도로는 25분 타이머를 말 합니다.</p>
          <p>-25분간 다짐한 1가지 일을 집중하세요 :)</p>
          <p>-두잇은 여러분의 다짐을 도와드립니다.</p>
        </TextInfoBox>
      </InfoDiv>
      {/* <InfoDiv>
        <LimitImg />
        <TextBox>
          <p style={{ fontSize: '1.5rem' }}>누구에게나 시간은 한정적입니다.</p>
        </TextBox>
      </InfoDiv> */}
    </MainFrame>
  );
};

export default Information;
