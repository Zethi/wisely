import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;