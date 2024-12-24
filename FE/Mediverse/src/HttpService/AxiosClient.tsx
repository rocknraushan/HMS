import axios from 'axios';
import Storage from '../storage/Storage';
import Config from 'react-native-config';

export const BASE_URL =
  // Config.BASE_URL;
  "http://192.168.82.202:5001"

const getAxiosClient = async () => {
  // Create a new Axios instance
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 60, // Request timeout (60 seconds)
    headers: {
      // Uncomment if needed, but be cautious with CORS issues in development
      // 'Access-Control-Allow-Origin': '*',
    },
  });

  // Add a request interceptor
  client.interceptors.request.use(async (request) => {
    const token = await Storage.getToken(); // Fetch token from storage
    if (token) {
      request.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }

    console.log(
      'API REQUEST====>',
      request.url,
      request.params,
      request.headers.Authorization
    );

    return request;
  });

  // Add a response interceptor
  client.interceptors.response.use(
    (response) => {
      console.log(
        'RESPONSE====>',
        response?.status,
        response?.config?.headers
      );

      // Handle success responses
      if (
        response?.status < 300 || // HTTP success statuses
        response?.data?.code < 300 || // Custom success codes
        response?.data?.success // Custom success flag
      ) {
        return response; // Return the response data
      }

      console.error('API ERROR RESPONSE====>', response?.status);
      throw response?.data; // Throw an error for non-successful responses
    },
    (error) => {
      console.error(
        'API ERROR====>',
        error?.response?.config?.data,
        error?.response?.status,
        error?.response
      );

      // Handle specific error cases (e.g., unauthorized)
      if (
        error?.response?.status === 401 || // HTTP Unauthorized
        error?.response?.data?.error?.err_str === 'E_REQUEST_UNAUTHORIZED' // Custom unauthorized error
      ) {
        // Handle token expiration or unauthorized access here
      }

      throw error; // Propagate the error
    }
  );

  return client; // Return the configured Axios client
};

export default getAxiosClient;
