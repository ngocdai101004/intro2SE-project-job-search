import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3200/api/',
    timeout: 10000, // Optional: Request timeout in ms
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Optional: Enable credentials for requests
});

// Interceptors for requests
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Add auth token, if available
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
//
// // Interceptors for responses
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     // (error) => {
//     //     // Handle errors globally
//     //     // if (error.response?.status === 401) {}
//     //     return Promise.reject(error);
//     // }
// );

export default axiosInstance;
