import axios from 'axios';

const fetchData = (method, path, data) =>
  axios({
    method,
    url: `https://api.mygraphr.com/api/${path}`,
    data,
    withCredentials: true,
  });

export default fetchData;
