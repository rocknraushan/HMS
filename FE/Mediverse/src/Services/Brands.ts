import { Services } from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import { Brands } from '../interfaces/Brands';
import { ErrorData, ResponseData } from '../interfaces/Response';

export const getBrands = async () => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.BRANDS_LIST);
    return data.data as ResponseData<Brands[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
