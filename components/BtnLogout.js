import React, { useCallback } from 'react';
import { Popconfirm, Icon, message } from 'antd';
import { useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';
import styled from 'styled-components';
import messages from '../config/messages';

const StyledButton = styled.button`
  border: 0;
  padding: 0;
  outline: 0;
  cursor: pointer;
`;

const BtnLogout = () => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  const onNotLogout = useCallback(() => {
    message.success(messages.notLogout);
  }, []);

  return (
    <Popconfirm
      title="설마 로그아웃 하실건가요?"
      onConfirm={onLogout}
      onCancel={onNotLogout}
      okText="네. 다신 하고 싶지 않습니다."
      cancelText="아닙니당;;"
    >
      <StyledButton>
        <Icon type="logout" />
        로그아웃
      </StyledButton>
    </Popconfirm>
  );
};

export default BtnLogout;
