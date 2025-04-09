import * as Keychain from 'react-native-keychain';
import { BASE_URL } from './AxiosClient'; // Or define your base URL here

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchClientOptions {
  method?: HTTPMethod;
  path: string;
  body?: any;
  isMultipart?: boolean;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

const FetchClient = async ({
  method = 'GET',
  path,
  body,
  isMultipart = false,
  headers = {},
  params = {},
}: FetchClientOptions) => {
  try {
    const user = await Keychain.getGenericPassword();
    if (!user) {
      throw new Error('User not authenticated');
    }
    const token = user?.password;

    // Build query string if there are params
    const queryString = new URLSearchParams(params as any).toString();
    const url = `${BASE_URL}${path}${queryString ? `?${queryString}` : ''}`;

    const fetchHeaders: Record<string, string> = {
      Accept: 'application/json',
      ...headers,
    };

    if (token) {
      fetchHeaders['Authorization'] = `Bearer ${token}`;
    }

    let fetchBody: BodyInit_ | undefined = undefined;

    if (body) {
      if (isMultipart) {
        fetchBody = body; // body must already be a FormData
      } else {
        fetchHeaders['Content-Type'] = 'application/json';
        fetchBody = JSON.stringify(body);
      }
    }

    const response = await fetch(url, {
      method,
      headers: fetchHeaders,
      body: fetchBody,
    });
    const contentType = response.headers.get('content-type');
    let responseData;
    if (contentType?.includes('application/json')) {
      responseData =  response
    } else {
      responseData = await response.text();
      console.warn('Non-JSON response:', responseData);
    }

    if (!response.ok) {
      console.error('API Error:', responseData);
      throw new Error(responseData.toString() || 'Something went wrong');
    }

    return responseData;
  } catch (error: any) {
    console.error('Network Error:', error.message || error);
    throw error;
  }
};

export default FetchClient;
