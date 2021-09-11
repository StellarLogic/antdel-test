import Axios from 'axios';

const baseURL = process.env.REACT_APP_BASEURL;

const axios = Axios.create({
  baseURL,
  timeout: 1000
});

axios.interceptors.request.use(
  (config) => {
    if (config.url !== 'user/login') {
      const { token } = localStorage;
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/user/refresh-token' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const { token } = localStorage;
          const res = await axios.get('/user/refresh-token', {
            headers: {
              Authorization: token
            }
          });
          localStorage.setItem('token', res?.data?.token);

          return axios(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axios;
