import axios from "axios";

const API = axios.create({
  baseURL: "https://salon-backend-daw1.vercel.app/api", 
  withCredentials: true, 
});

export default API;