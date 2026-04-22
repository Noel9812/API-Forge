import axios from "axios";

const API = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:3000`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;