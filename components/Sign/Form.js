import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormBox = styled.div`
  position: relative;
  height: 200px;
  width: auto;
  margin: 250px;
  border: 1px solid coral;
`;

const nickHandler = init => {
  const [value, setValue] = useState(init);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };
  return { value, onChange };
};
const idHandler = init => {
  const [value, setValue] = useState(init);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };
  return { value, onChange };
};
const pinHandler = init => {
  const [value, setValue] = useState(init);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };
  return { value, onChange };
};

const submitHandler = async (userNick, id, pin) => {
  console.log(userNick, id, pin);
  //   axios ? post

  const test = await axios({
    method: 'post',
    url: 'http://localhost:8085/api/user/signup',
    headers: {},
    data: {
      email: id,
      nickname: userNick,
      password: pin
    }
  });
  console.log(test);
};
const From = () => {
  let useNick = nickHandler('');
  let nick = useNick.value;
  let useId = idHandler('');
  let id = useId.value;
  let usePin = pinHandler('');
  let pin = usePin.value;

  return (
    <FormBox>
      <form>
        <div>
          <label>닉네임</label>
          <input {...useNick}></input>
        </div>
        <div>
          <label>아이디</label>
          <input {...useId}></input>
        </div>
        <div>
          <label>비밀번호</label>
          <input {...usePin}></input>
        </div>
      </form>
      <div>
        <input
          type="submit"
          value="완료"
          onClick={() => submitHandler(nick, id, pin)}
        />
      </div>
    </FormBox>
  );
};

export default From;
