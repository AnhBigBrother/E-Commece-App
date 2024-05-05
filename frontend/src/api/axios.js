import axios from 'axios';

export default axios.create({
  withCredentials: true,
  baseURL: 'https://e-commece-czc4.onrender.com/api',
  headers: {
    // withCredentials: true,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
