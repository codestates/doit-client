import React from 'react';
import styled from 'styled-components';
import DetailWithImg from '../components/DetailWithImg';
import GoogleLoginButton from '../components/GoogleLoginButton';

const DoitDiv = styled.div`
  position: relative;
  font-size: 2rem;
  top: 30px;
  padding: 200px 0;
  background-image: url('/static/images/introBackground.jpeg');
  background-size: cover;
  filter: brightness(40%);
`;

const DoitText = styled.div`
  position: absolute;
  top: 210px;
  font-size: 4rem;
  font-weight: bold;
  color: white;
  z-index: 1;
`;

const GoogleLoginButtonDiv = styled.div`
  position: relative;
  top: -10px;
  left: 5px;
`;

const intro = () => {
  return (
    <div>
      <div>
        <DoitDiv />
        <DoitText>
          <span style={{ fontSize: '7rem' }}>두잇</span>
          <br />
          <span>당신의 집중력 향상을 위해</span>
          <GoogleLoginButtonDiv>
            <GoogleLoginButton />
          </GoogleLoginButtonDiv>
        </DoitText>
      </div>
      <DetailWithImg
        colSize={[13, { span: 9, push: 2 }]}
        title="집중해서 일하고, 돌아보세요"
        textList={[
          '공부나 일을 하다가 유튜브나 카톡을 아주 잠깐 본 것 같은데 시간이 엄청 가 있어서 당황했던 적 누구나 있을겁니다!',
          '두잇은 일에 집중할 수 있도록 타이머 설정을 도와줄 뿐 아니라, 계획과 실제 한일을 비교하여 유저 스스로 발전하게 하는 작지만 강력한 툴입니다!',
        ]}
        imgList={[
          {
            alt: '양원석',
            src: '/static/images/doitMain.png',
          },
        ]}
      />
      <DetailWithImg
        colSize={[
          { span: 13, push: 12 },
          { span: 9, pull: 13 },
        ]}
        title="DO IT 사용법"
        textList={[
          '1. 몇분 동안 무슨 일을 할지를 적습니다.',
          '2. 시작 버튼을 누르고 집중력을 불태웁니다.',
          <>
            3. 시간이 완료되면 실제 한 일을 적고,
            <br /> 계획과 비교하며 반성, 발전합니다.
          </>,
        ]}
        imgList={[
          {
            alt: '양원석',
            src: '/static/images/doitHistory.png',
          },
        ]}
      />
    </div>
  );
};

export default intro;
