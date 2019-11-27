import React from 'react';
import { useSelector } from 'react-redux';
import { Anchor } from 'antd';
import moment from 'moment';

const { Link } = Anchor;

const LinkItems = ({ todo }) => {
  return <Link href={`#${todo.id}`} title={todo.todoContent} />;
};

const TimelineAnchors = () => {
  const { me } = useSelector((state) => state.user);
  const { date, todos } = useSelector((state) => state.todoHistory);

  return (
    <div style={{ marginTop: '20px' }}>
      <Anchor>
        <Link href="#" title={moment(date).format('YYYY-MM-DD')} />
        {me && todos && todos.length ? (
          todos.map((todo) => <LinkItems key={todo.id} todo={todo} />)
        ) : (
          <Link href="#" title="Todo가 아직 없습니다." />
        )}
      </Anchor>
    </div>
  );
};

export default TimelineAnchors;
