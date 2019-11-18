import { useState } from 'react';
const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = (e) => {
    setter(e.target.value);
  };
  return [value, handler];
};

export default useInput;
