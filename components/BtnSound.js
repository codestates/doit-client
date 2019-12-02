import React, { useCallback } from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { TOGGLE_SOUND_ON_OFF } from '../reducers/timer';

const Wrapper = styled.div`
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;

  button {
    margin-right: 5px;

    &.ant-switch.ant-switch-checked {
      background-color: #252525;
    }
  }
`;

const BtnSound = () => {
  const dispatch = useDispatch();

  const onChangeSound = useCallback(
    (checked) => {
      dispatch({
        type: TOGGLE_SOUND_ON_OFF,
        data: checked,
      });
    },
    [dispatch],
  );

  return (
    <Wrapper>
      <Switch size="small" defaultChecked onChange={onChangeSound} />
      엔딩송
    </Wrapper>
  );
};

export default BtnSound;
