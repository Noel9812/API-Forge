import axios from "axios";

const API = axios.create({
  baseURL: "http://44.213.149.30:3000",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;