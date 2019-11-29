import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Anchor } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

const { Title } = Typography;
const { Link } = Anchor;

const Wrapper = styled.div`
  h4.ant-typography {
    font-size: 1.2em;
  }
  
  & .ant-anchor-wrapper {
    background: transparent;
    
    &>.ant-anchor {
      margin-bottom: 40px;
    }
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const LinkItems = ({ todo }) => {
  return (
    <Link href={`#${todo.id}`} title={todo.todoContent} />
  );
};

const TimelineAnchors = () => {
  const { me } = useSelector((state) => state.user);
  const { date, todos } = useSelector((state) => state.todoHistory);

  return (
    <Wrapper>
      <Title level={4}>{moment(date).format('YYYY년 MM월 DD일')}의 두잇</Title>
      <Anchor>
        {me && todos && todos.length ? (
          todos.map(todo => <LinkItems key={todo.id} todo={todo} />)
        ) : (
          <Link href="#" title="한일이 없어용" />
        )}
      </Anchor>
    </Wrapper>
  );
};

export default TimelineAnchors;
