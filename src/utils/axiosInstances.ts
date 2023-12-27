import axios from 'axios';

const BASE_URL = 'https://take-home-test-api.nutech-integrasi.app';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const axiosInstanceWAuth = (token: string) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export {axiosInstance, axiosInstanceWAuth};
