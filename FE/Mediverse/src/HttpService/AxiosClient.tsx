import axios from 'axios';
import * as Keychain from 'react-native-keychain';

export const BASE_URL = "http://192.168.39.141:5000/";

const getAxiosClient = async () => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 60,
  });

  client.interceptors.request.use(async (request) => {
    try {
      const user = await Keychain.getGenericPassword();
      if (user && user.password) {
        request.headers.Authorization = `Bearer ${user.password}`;
      }
    } catch (error) {
      console.log('Error fetching auth token from Keychain:', error);
    }

    console.log(
      'API REQUEST====>',
      request?.url,
      request?.params ?? {},
      request?.headers ?? {},
    );

    return request;
  });

  client.interceptors.response.use(
    (response) => {
      console.log(
        'RESPONSE====>',
        response?.status,
        response?.config?.headers
      );

      if (
        response?.status < 300 ||
        response?.data?.code < 300 ||
        response?.data?.success
      ) {
        return response;
      }

      console.error('API ERROR RESPONSE====>', response?.status);
      throw response?.data;
    },
    (error) => {
      console.error(
        'API ERROR====>',
        error?.response?.config?.data,
        error?.response?.status,
        error?.response
      );

      if (
        error?.response?.status === 401 ||
        error?.response?.data?.error?.err_str === 'E_REQUEST_UNAUTHORIZED'
      ) {
        // Optionally, trigger logout or refresh token flow
      }

      throw error;
    }
  );

  return client;
};

export default getAxiosClient;
