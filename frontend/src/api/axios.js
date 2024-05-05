import axios from 'axios';

export default axios.create({
  withCredentials: true,
  baseURL: 'https://bruhh-e-commece-server.onrender.com/api',
  headers: {
    // withCredentials: true,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
