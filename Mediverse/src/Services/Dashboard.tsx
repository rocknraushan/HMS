import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {
  DashboardCollection,
  DashboardInventory,
  DashboardOrderType,
} from '../interfaces/Collections';
import {ErrorData, ResponseData} from '../interfaces/Response';

export const getDashboardCollections = async (
  userId: number,
  period: string,
) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.DASHBOARD_COLLECTIONS, {
      params: {
        user_id: userId,
        period: period,
      },
    });
    return data.data as ResponseData<DashboardCollection>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getDashboardInventory = async (userId: number, period: string) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.DASHBOARD_INVENTORY, {
      params: {
        user_id: userId,

        period: period,
      },
    });
    return data.data as ResponseData<DashboardInventory>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getDashboardOrderValue = async (
  userId: number,
  period: string,
) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.DASHBOARD_ORDER_VALUE+userId, {
      params: {
        user_id: userId,

        period: period,
      },
    });
    return data.data as ResponseData<DashboardOrderType>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
