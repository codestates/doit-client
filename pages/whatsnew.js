import React from 'react';
import styled from 'styled-components';
import { Row, Col, Timeline } from 'antd';

const Wrapper = styled.div`
  padding-top: 40px;

  @media (max-width: 767px) {
    & > div > .ant-col {
      margin-bottom: 40px;
    }
  }
`;

const TimelineDate = styled.p`
  font-size: 20px;
`;

const TimelineContent = styled.p`
  font-size: 15px;
`;

const whatsnewData = [
  {
    date: '2019-12-02',
    works: [
      { id: 1, content: '타이머 숫자 폰트 변경.' },
      { id: 2, content: '프로그램 오픈!' },
    ],
  },
  {
    date: '2019-12-01',
    works: [{ id: 3, content: '랜딩 페이지 적용.' }],
  },
  {
    date: '2019-11-29',
    works: [{ id: 4, content: '피드백 기능 추가.' }],
  },
  {
    date: '2019-11-26',
    works: [{ id: 5, content: 'Google Login 적용.' }],
  },
  {
    date: '2019-11-09',
    works: [{ id: 6, content: 'backend test server open.' }],
  },
  {
    date: '2019-11-02',
    works: [{ id: 7, content: 'doit 프로젝트 시작!' }],
  },
];

const whatsnew = () => {
  return (
    <Wrapper className="container">
      <Row gutter={24} type="flex" justify="space-between">
        <Col xs={24} md={24}>
          <Timeline>
            {whatsnewData && whatsnewData.map((item) => (
              <Timeline.Item key={item.date} color="#ffde5a">
                <TimelineDate>{item.date}</TimelineDate>
                {item.works.map((work) => (
                  <TimelineContent key={work.id}>{work.content}</TimelineContent>
                ))}
              </Timeline.Item>
            ))}
          </Timeline>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default whatsnew;
