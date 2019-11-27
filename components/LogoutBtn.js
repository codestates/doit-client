import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 0;
  padding: 0;
  outline: 0;
  cursor: pointer;
`;

const LogoutBtn = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <StyledButton
      onClick={onLogout}
    >
      로그아웃
    </StyledButton>
  );
};

export default LogoutBtn;
