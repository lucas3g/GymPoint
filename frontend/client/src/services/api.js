import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1903',
});

export default api;
