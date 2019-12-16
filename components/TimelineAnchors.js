import React from 'react';
import PropTypes from 'prop-types';
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

    & > .ant-anchor {
      margin-bottom: 40px;
    }
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const LinkItems = ({ todo, index }) => (
  <Link href={`#${todo.id}`} title={`#${index + 1}  ${todo.todoContent}`} />
);

const TimelineAnchors = () => {
  const { me } = useSelector((state) => state.user);
  const { date, todos } = useSelector((state) => state.todoHistory);

  return (
    <Wrapper>
      <Title level={4}>
        {moment(date).format('YYYY년 MM월 DD일')}
        의 두잇
      </Title>
      <Anchor>
        {me && todos && todos.length ? (
          todos.map((todo, index) => (
            <LinkItems key={todo.id} todo={todo} index={index} />
          ))
        ) : (
          <Link href="#" title="한일이 없어용" />
        )}
      </Anchor>
    </Wrapper>
  );
};

LinkItems.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired,
    todoContent: PropTypes.string.isRequired,
    doneContent: PropTypes.string,
    timelines: PropTypes.array.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TimelineAnchors;
