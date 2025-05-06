import axios from 'axios';
import * as Keychain from 'react-native-keychain';

export const BASE_URL =
  // "https://hms-f6xv.onrender.com/";
"http://192.168.26.129:5000/";

const getAxiosClient = async () => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 60,
  });

  client.interceptors.request.use(async (request) => {
    try {
      const user = await Keychain.getGenericPassword();
      if (user && user.password) {
        const { token, roles } = JSON.parse(user.password);
        request.headers.Authorization = `Bearer ${token}`;
        console.log('🔐 Token attached:', token);
      }
    } catch (error) {
      console.log('❌ Error fetching auth token from Keychain:', error);
    }

    if (request.baseURL && request.url) {

      console.log('📤 API REQUEST ====>', {
        method: request.method?.toUpperCase(),
        url: request.baseURL + request.url,
        params: request.params ?? {},
        data: request.data ?? {},
        headers: request.headers ?? {},
      });
    }

    return request;
  });

  client.interceptors.response.use(
    (response) => {
      if (response?.config.baseURL && response?.config.url) {

        console.log('✅ API RESPONSE ====>', {
          status: response.status,
          // url: response.config?.baseURL + response?.config.url,
          // headers: response.config.headers,
          data: response.data,
        });
      }

      if (
        response?.status < 300 ||
        response?.data?.code < 300 ||
        response?.data?.success
      ) {
        return response;
      }

      console.error('⚠️ API ERROR RESPONSE ===>', {
        status: response?.status,
        data: response?.data,
      });
      throw response?.data;
    },
    (error) => {
      console.error('❌ API ERROR ====>', {
        method: error?.config?.method?.toUpperCase(),
        url: error?.config?.baseURL + error?.config?.url,
        status: error?.response?.status,
        requestData: error?.config?.data,
        responseData: error?.response?.data,
        headers: error?.response?.headers,
      });

      if (
        error?.response?.status === 401 ||
        error?.response?.data?.error?.err_str === 'E_REQUEST_UNAUTHORIZED'
      ) {
        Keychain.resetGenericPassword()
          .then(() => {
            console.log('🔓 Keychain reset successfully due to unauthorized request');
          });
      }

      throw error;
    }
  );

  return client;
};

export default getAxiosClient;
