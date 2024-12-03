import axios from 'axios';
import Storage from '../storage/Storage';

export const BASE_URL = 'http://18.142.186.85';

const getAxiosClient = async () => {
  const client = axios.create({
    // Set the base URL for all requests
    baseURL: BASE_URL,
    headers: {
      //Commenting this as was getting CORS in localhost.
      //https://stackoverflow.com/questions/62569594/request-header-field-access-control-allow-origin-is-not-allowed-by-access-contr
      //'Access-Control-Allow-Origin': '*'
    },
    timeout: 1000 * 60,
  });

  client.interceptors.request.use(async request => {
    const token = await Storage.getToken();
    if (token) request.headers.Authorization = 'Bearer '+token;
    console.log(
      'REQ',
      request.url,
      request.params,
      request.headers.Authorization,
    );

    return request;
  });

  client.interceptors.response.use(
    response => {
      console.log('RES', response?.status,response?.config?.headers);

      if (
        response?.status < 300 ||
        response?.data?.code < 300 ||
        response?.data?.success
      ) {
        return response;
      }

      console.log('ERR1', response?.status);
      throw response?.data;
    },
    error => {
      console.error(
        'ERR2',
        error?.response?.config?.data,
        error?.response?.status,
      );

      if (
        error?.response?.status === 401 ||
        error?.response?.data?.error?.err_str === 'E_REQUEST_UNAUTHORIZED'
      ) {
      }
      throw error;
    },
  );

  return client;
};
export default getAxiosClient;
