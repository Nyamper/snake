import axios from 'axios';
import { baseURL } from '../constants';

const client = axios.create({
  baseURL: baseURL,
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
