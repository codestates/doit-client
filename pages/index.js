import React, { useEffect } from 'react';
import Router from 'next/router';
import { Typography } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import DetailWithImg from '../components/DetailWithImg';
import GoogleLoginButton from '../components/GoogleLoginButton';

const { Title, Paragraph } = Typography;

const DoitImage = styled.div`
  position: relative;
  height: 100vh;
  background-image: url('/static/images/introBackground.jpeg');
  background-size: cover;
  filter: brightness(40%);
`;

const DoitText = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translate(0, -50%);
  font-weight: bold;
  z-index: 1;

  & h1.ant-typography {
    color: #fff;
    font-size: 60px;
  }
  
  & div.ant-typography {
    color: #fff;
    font-size: 30px;
  }
`;

const Index = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (me) {
      Router.push('/timer');
    }
  }, [me && me.id]);

  return (
    <>
      <div>
        <DoitImage />
        <DoitText>
          <div className="container">
            <Title level={1}>두잇</Title>
            <Paragraph><p>당신의 집중력 향상을 위해</p></Paragraph>
            <GoogleLoginButton />
          </div>
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
            alt: '이미지',
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
            alt: '이미지',
            src: '/static/images/doitHistory.png',
          },
        ]}
      />
    </>
  );
};

export default Index;
