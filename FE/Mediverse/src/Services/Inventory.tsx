import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {InventoryType} from '../interfaces/Inventory';
import {ErrorData, ResponseData} from '../interfaces/Response';

export const getInventory = async (userId: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.INVENTORY + userId);
    return data.data as ResponseData<InventoryType[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
