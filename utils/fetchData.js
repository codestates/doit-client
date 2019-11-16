import axios from 'axios';
// axios.defaults.withCredentials = true;

const fetchData = (method, path, data) =>
  axios({
    method,
    url: `https://api.mygraphr.com/api/${path}`,
    data,
    withCredentials: true,
    // credentials: true,
    // credentials: 'include',
  });

export default fetchData;
