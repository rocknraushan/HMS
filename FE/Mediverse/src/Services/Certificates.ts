import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {ErrorData, ResponseData} from '../interfaces/Response';

export const addCertificate = async (userId: number, values: any) => {
  try {
    const axiosClient = await getAxiosClient();
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('companyName', values.companyName);
    formData.append('companyEmail', values.companyEmail);
    var filename = values.cert.path.replace(/^.*[\\/]/, '');

    // return;
    formData.append('companyCertificate', {
      name: filename,
      uri: values.cert.path,
      type: 'image/jpeg',
    });

    const data = await axiosClient.post(
      Services.CERTIFICATE_AUTHORIZE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data.data as ResponseData<any>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const CERTIFICATE_AUTHORIZE_DATA = async (userId: number, values?: any) => {
  try {
    const axiosClient = await getAxiosClient();
    
    const data = await axiosClient.get(
      Services.CERTIFICATE_AUTHORIZE+`?user_id=${userId}`,
      
    );
    return data.data as ResponseData<any>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};




