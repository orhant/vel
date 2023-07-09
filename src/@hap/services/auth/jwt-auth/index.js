import axios from 'axios';

const jwtAxios = axios.create({
  baseURL: 'http://api.hap.com/v1/', //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  (response) => {
    const statusCode = response.data.code;
    if (statusCode !== 0) {
      return Promise.reject(
        new Error(response?.data?.message || 'Invalid response status code'),
      );
    }
    return response;
  },
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);
export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default jwtAxios;
