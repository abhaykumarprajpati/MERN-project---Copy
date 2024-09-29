// src/axiosConfig.js

import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use an environment variable for the base URL
  headers: {
    'Content-Type': 'application/json', // Set default headers if needed
  },
});

// You can set up interceptors for requests or responses here if neededm

export default axiosInstance;
