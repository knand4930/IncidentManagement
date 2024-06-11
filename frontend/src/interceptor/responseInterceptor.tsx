import { toast } from "react-toastify";

export function setupResponseInterceptor(axiosInstance:any) {
  axiosInstance.interceptors.response.use(
    (response:any) => {
      // Add any response-related logic here
      return response;
    },
    (error:any) => {
      // Handle error responses here
      if (error.response) {
        // Handle HTTP error status codes (e.g., 401, 403)
        const status = error.response.status;

        if (status === 401 || status === 403) {
          // Redirect to the login page for unauthorized or forbidden access
          window.location.href = '/login';
        } else {
          // Handle other HTTP errors here
          
          // You may want to show a toast notification or perform other actions
          // toast.error(`Error: ${status} - ${error.response.data}`);
        }
      } else if (error.request) {
        // Handle timeout or network errors
        
        // You can also redirect to the login page for specific error conditions
        // window.location.href = '/login';
      } else {
        // Handle other errors
       
        // Redirect to the login page or perform other actions
        // window.location.href = '/login';
      }

      // Propagate the error to the calling code
      return Promise.reject(error);
    }
  );
}