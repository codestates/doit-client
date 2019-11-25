import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Anchor } from 'antd';
import moment from 'moment';

import { LOAD_TODOS_REQUEST } from '../reducers/todoHistory';

const { Link } = Anchor;

const LinkItems = ({ todo }) => {
  return <Link href={`#${todo.id}`} title={todo.todoContent} />;
};

const TimelineAnchors = () => {
  const { me } = useSelector((state) => state.user);
  const { todos } = useSelector((state) => state.todoHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_TODOS_REQUEST,
      data: {
        date: moment().format('YYYY-MM-DD'),
      },
    });
  }, [me && me.id]);

  return (
    <div style={{ marginTop: '20px' }}>
      <Anchor>
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
