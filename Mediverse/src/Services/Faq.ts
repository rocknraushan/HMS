import { Services } from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import { FaqCategory } from '../interfaces/Faq';
import { ErrorData, ResponseData } from '../interfaces/Response';

export const getFaq = async () => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.FAQ);
    return data.data as ResponseData<FaqCategory[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
