import axios from "axios";

// const axiosBackInstance = axios.create({
//     baseURL: 'http://localhost:5000', // Replace with your API base URL
// });

const axiosBackInstance = axios.create({
    baseURL: 'https://problem-forge-ai-backend.vercel.app', // Replace with your API base URL
});

// Request interceptor
axiosBackInstance.interceptors.request.use(
    (config) => {
        // Modify the request config here (add headers, authentication tokens)
        const accessToken = localStorage.getItem("user");

        // If token is present, add it to request's Authorization Header
        if (accessToken) {
            if (config.headers) config.headers.Authorization = `Bearer ${JSON.parse(accessToken).token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Response interceptor
axiosBackInstance.interceptors.response.use(
    (response) => {
        // Modify the response data here
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);

export default axiosBackInstance;