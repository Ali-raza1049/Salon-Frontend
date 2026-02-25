import axios from "axios";

const API = axios.create({
  baseURL: "https://salon-backend-pdcn.vercel.app/api", 
  withCredentials: true, 
});

export default API;