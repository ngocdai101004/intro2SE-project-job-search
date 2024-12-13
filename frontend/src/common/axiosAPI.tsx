import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3200/api', // Your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Only if your backend uses cookies
});

export default api;
