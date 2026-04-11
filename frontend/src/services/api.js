import axios from "axios";

const API = axios.create({
  baseURL: "https://blogapp-oyg9.onrender.com/api", // DEV
});

// https://blogapp-oyg9.onrender.com/api
// Attach token automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;

