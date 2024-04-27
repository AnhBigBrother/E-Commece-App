import axios from 'axios';

export default axios.create({
  withCredentials: true,
  timeout: 10000,
  baseURL: 'https://e-commece-api.vercel.app/api',
  headers: {
    // withCredentials: true,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
