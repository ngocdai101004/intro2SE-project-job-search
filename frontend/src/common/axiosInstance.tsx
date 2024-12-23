import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3200/api/',
    timeout: 10000, // Optional: Request timeout in ms
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
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
//     (response) => {
//         // If the response is successful, simply return it
//         return response;
//     },
//     (error) => {
//         // Check for specific error conditions (e.g., user not verified)
//         if (error.response && error.response.status === 401) {
//             console.log("User not verified");
//         }
//
//         // Reject the promise with the error
//         return Promise.reject(error);
//     }
// );
export default axiosInstance;
