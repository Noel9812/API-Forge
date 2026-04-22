import axios from "axios";

const API = axios.create({
  baseURL: window.location.origin.replace(":5173", ":3000"),
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;