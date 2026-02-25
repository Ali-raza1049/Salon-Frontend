import axios from "axios";

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

export default API;