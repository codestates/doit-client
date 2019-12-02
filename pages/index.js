import React, { useEffect } from 'react';
import Router from 'next/router';
import { Typography } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import DetailWithImg from '../components/DetailWithImg';
import GoogleLoginButton from '../components/GoogleLoginButton';

const { Title, Paragraph } = Typography;

const MainImage = styled.div`
  position: relative;
  height: 100vh;
  background-image: url('/static/images/bg.jpeg');
  background-size: cover;
  filter: brightness(40%);
`;

const MainText = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translate(0, -50%);
  font-weight: bold;
  z-index: 1;

  & h1.ant-typography {
    color: #fff;
    font-size: 60px;
    margin-bottom: 0.2em;
  }
  
  & div.ant-typography {
    color: #fff;
    font-size: 30px;
  }
`;

const Description = styled.div`
  padding: 60px 0;
  background: #fff;
`;

const Suggestion = styled.div`
  padding-top: 100px;
  height: 400px;

  & h2.ant-typography {
    margin-bottom: 1em;
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
        <MainImage />
        <MainText>
          <div className="container">
            <Title level={1}>두잇</Title>
            <Paragraph><p>당신의 집중력을 위해</p></Paragraph>
            <GoogleLoginButton />
          </div>
        </MainText>
      </div>
      
      <Description>
        <DetailWithImg
          colSize={[13, 11]}
          title="더 이상 자책하지 마세요"
          textList={[
            '공부나 일을 하다가 유튜브나 카톡을 아주 잠깐 본 것 같은데 시간이 엄청 가 있어서 스스로에 대한 분노가 치밀었던 적 누구나 있을겁니다!',
            '그런 상황을 막기 위해 두잇이 탄생했습니다.',
          ]}
          imgList={[
            {
              alt: '이미지',
              src: '/static/images/doit0.jpeg',
            },
          ]}
        />
        <DetailWithImg
          colSize={[
            { span: 11, push: 13 },
            { span: 13, pull: 11 },
          ]}
          title="두잇 사용법"
          textList={[
            '1. 몇분 동안 무슨 일을 할지를 적습니다.',
          ]}
          imgList={[
            {
              alt: '이미지',
              src: '/static/images/doit1.png',
            },
          ]}
        />
        <DetailWithImg
          colSize={[13, 11]}
          textList={[
            '2. 시작 버튼을 누르고 집중력을 불태웁니다.',
          ]}
          imgList={[
            {
              alt: '이미지',
              src: '/static/images/doit2.jpg',
            },
          ]}
        />
        <DetailWithImg
          colSize={[
            { span: 11, push: 13 },
            { span: 13, pull: 11 },
          ]}
          textList={[
            <>
              3. 시간이 완료되면 실제 한 일을 적고,
              <br /> 계획과 비교하며 반성, 발전합니다.
            </>,
          ]}
          imgList={[
            {
              alt: '이미지',
              src: '/static/images/doit3.png',
            },
          ]}
        />
      </Description>

      <Suggestion>
        <div className="container">
          <Title level={2}>집중해서 일하고, 돌아보세요.</Title>
          <GoogleLoginButton />
        </div>
      </Suggestion>
    </>
  );
};

export default Index;
