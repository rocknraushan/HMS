import moment from 'moment';
import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {GSTData, GSTType} from '../interfaces/GST';
import {ErrorData, ResponseData} from '../interfaces/Response';
import {Image as ImageType} from 'react-native-image-crop-picker';

export const getGSTType = async () => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.get(Services.GST_TYPE);
    return result.data as ResponseData<GSTType[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
export const checkGST = async (gst: string) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.post(Services.GST_CHECK, {
      gstNumber: gst,
    });
    return result.data as ResponseData<GSTData>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const gstRegister = async (user_id: number, values: any, additionalAddress?: string[]) => {
  try {
    const axiosClient = await getAxiosClient();
    const formData = new FormData();
    formData.append('userid', user_id);
    Object.keys(values).map(key => {
      if(key === 'gstTypeId') {
        //Do Nothing
      }
      else if (key === 'gstType') {
        formData.append('gstTypeId', values[key]);
      } else if (key === 'dateOfRegistration') {
        const date = moment(values[key]).format('YYYY-MM-DD');
        formData.append(key, date);
      } else if(key === 'additionalAddress'){
        const address = values?.dateOfRegistration ? additionalAddress : [values[key]] 
        formData.append(key, address);
      } else if (!['aadharFrontImage', 'aadharBackImage'].includes(key)) {
        formData.append(key, values[key]);
      }
      
    });

    var filename1 = values.aadharFrontImage.path.replace(/^.*[\\/]/, '')
    formData.append('aadharFrontImage', {

      ...values.aadharBackImage,
      name: filename1,
      uri: values.aadharFrontImage.path,
      type: 'image/jpeg',
    });

    var filename2 = values.aadharBackImage.path.replace(/^.*[\\/]/, '')
    formData.append('aadharBackImage', {
      ...values.aadharBackImage,
      name: filename2,
      uri: values.aadharBackImage.path,
      type: 'image/jpeg',
    });
    const result = await axiosClient.post(Services.GST_REGISTER, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data as ResponseData<GSTData>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
