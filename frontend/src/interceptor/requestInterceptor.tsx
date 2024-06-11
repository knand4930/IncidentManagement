export function setupRequestInterceptor(axiosInstance:any) {
    axiosInstance.interceptors.request.use(
      (config:any) => {
        // Add JWT token from local storage to the request headers
        const token = localStorage.getItem('token'); // Replace with your token key
        if (token) {
          config.headers['Authorization'] = `JWT ${token}`;
          config.headers['content-type'] = 'multipart/form-data'
        }
        return config;
      },
      (error:any) => {
        return Promise.reject(error);
      }
    );
  }