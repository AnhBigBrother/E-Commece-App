import axios from "axios";

export default axios.create({
  withCredentials: true,
  timeout: 10000,
  baseURL: "http://localhost:5000/api",
  headers: {
    // withCredentials: true,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
