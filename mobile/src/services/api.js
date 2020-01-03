import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.108:1903"
});

export default api;
