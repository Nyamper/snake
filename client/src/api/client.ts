import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || '',
});

client.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default client;
