import axios from "axios";
import encodeurl from "encodeurl"

const axiosPolygonInstance = axios.create({
    baseURL: 'https://polygon.codeforces.com/api', // Replace with your API base URL
});

// Request interceptor
axiosPolygonInstance.interceptors.request.use(
    (config) => {
        // Modify the request config here (add headers, authentication tokens)
        // const accessToken = localStorage.getItem("user");

        // // If token is present, add it to request's Authorization Header
        // if (accessToken) {
        //     if (config.headers) config.headers.Authorization = `Bearer ${JSON.parse(accessToken).token}`;
        // }
        if (config.url) {
            config.url = encodeURI(config.url);
        }
        console.log(config.url);
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

// Response interceptor
axiosPolygonInstance.interceptors.response.use(
    (response) => {
        // Modify the response data here
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);

export default axiosPolygonInstance;