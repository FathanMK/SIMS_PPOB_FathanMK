import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://take-home-test-api.nutech-integrasi.app',
});

export default axiosInstance;
