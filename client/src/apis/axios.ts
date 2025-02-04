import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8008',
  timeout: 10000,
})

// Auth API
// axiosClient?.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Token ${token}`;
//   }
//   return config;
// });

export default axiosClient;
