import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
    date: '2019-12-09',
    works: [
      { id: 11, content: '실제 집중한 시간과 중간 pause 시간을 따로 계산해주는 기능 추가' },
      { id: 10, content: 'todo를 적다가 페이지를 옮겨도 적던 내용 남는 기능 추가' },
      { id: 9, content: 'History카드 삭제 기능 추가' },
      { id: 8, content: 'todo에 내용이 있거나 커서가 focus되어 있을시 프로그램 닫기전 닫을지 묻는 기능 추가' },
    ],
  },
  {
    date: '2019-12-02',
    works: [
      { id: 7, content: '타이머 숫자 폰트 변경.' },
      { id: 6, content: '프로그램 오픈!' },
    ],
  },
  {
    date: '2019-12-01',
    works: [{ id: 5, content: '랜딩 페이지 적용.' }],
  },
  {
    date: '2019-11-29',
    works: [{ id: 4, content: '피드백 기능 추가.' }],
  },
  {
    date: '2019-11-26',
    works: [{ id: 3, content: 'Google Login 적용.' }],
  },
  {
    date: '2019-11-09',
    works: [{ id: 2, content: 'backend test server open.' }],
  },
  {
    date: '2019-11-02',
    works: [{ id: 1, content: 'doit 프로젝트 시작!' }],
  },
];

const whatsnew = () => {
  const { savedTodoContent, focusOnTodoContent } = useSelector((state) => state.timer);

  useEffect(() => {
    const listener = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    if (savedTodoContent !== '' || focusOnTodoContent) {
      window.addEventListener('beforeunload', listener);
    }
    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, [savedTodoContent, focusOnTodoContent]);

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
