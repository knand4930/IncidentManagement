// axiosInstance.js
import axios from 'axios';
import { setupRequestInterceptor } from './requestInterceptor';
import { setupResponseInterceptor } from './responseInterceptor';

const API_URL = process.env.REACT_APP_API_URL;
// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  // timeout: 5000, // Adjust the timeout as needed
});

// Set up request interceptor
setupRequestInterceptor(axiosInstance);

// Set up response interceptor
setupResponseInterceptor(axiosInstance);

export default axiosInstance;