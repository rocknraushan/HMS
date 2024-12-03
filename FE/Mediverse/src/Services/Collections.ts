import { Services } from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import { CollectionsType } from '../interfaces/Collections';
import { ErrorData, ResponseData } from '../interfaces/Response';

export const getCollections = async (userId: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.COLLECTIONS, {
      params: {
        user_id: userId,
      },
    });
    return data.data as ResponseData<CollectionsType[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

