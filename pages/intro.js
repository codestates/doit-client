import React from 'react';
import styled from 'styled-components';
import DetailWithImg from '../components/DetailWithImg';

const DoitDiv = styled.div`
  position: relative;
  font-size: 2rem;
  top: 30px;
  padding: 200px 0;
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
          <span style={{ fontSize: '5rem' }}>두잇</span>
          <br />
          <span>이제부터 시작하세요</span>
        </DoitDiv>
      </div>
      <DetailWithImg 
        colSize={[13, { span: 9, push: 2 }]}
        title="쉽게 공부하세요"
        textList={[
          '공부나 일을 하다가 유튜브나 카톡을 아주 잠깐 본 것 같은데 시간이 엄청 가 있어서 당황했던 적 누구나 있을겁니다!',
          '두잇은 일에 집중할 수 있도록 타이머 설정을 도와줄 뿐 아니라, 계획과 실제 한일을 비교하여 유저 스스로 발전하게 하는 작지만 강력한 툴입니다!'
        ]}
        imgList={[
          {
            alt:'양원석',
            src:'https://static.toss.im/web-general/homepage/static/images/legacy/3.0/p1-screen01.png'
          }
        ]}
      />
      <DetailWithImg 
        colSize={[{ span: 13, push: 12 }, { span: 9, pull: 13 }]}
        title="DO IT 사용법"
        textList={[
          '1. 몇분 동안 무슨 일을 할지를 적습니다.',
          '2. 시작 버튼을 누르고 집중력을 불태웁니다.',
          <>3. 시간이 완료되면 실제 한 일을 적고,<br /> 계획과 비교하며 반성, 발전합니다.</>
        ]}
        imgList={[
          {
            alt:'양원석',
            src:'https://static.toss.im/web-general/homepage/static/images/legacy/3.0/p1-screen01.png'
          }
        ]}
      />
    </div>
  );
};

export default intro;
