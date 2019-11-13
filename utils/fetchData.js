import axios from 'axios';

const fetchData = (method, path, data) => {
  axios({
    method,
    url: `http://localhost:8085/api/todo/${path}`,
    data,
    withCredentials: true,
  });
};

export default fetchData;
