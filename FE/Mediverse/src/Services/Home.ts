import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {HomePosts, SellerProfile} from '../interfaces/Post';
import {ErrorData, ListResponse, ResponseData} from '../interfaces/Response';

export const getBuyerHome = async (
  userId: number,
  tab: string,
  page: number,
  selectedProfile?: number,
) => {
  try {
    const isNew = tab.includes('New');
    let url = isNew
      ? `${Services.NEW_SELLER_POSTS}${userId}/?page=${page}`
      : `${Services.MY_SELLER_POSTS}${userId}/?page=${page}`;

    if (selectedProfile) {
      url = `${Services.SELECTED_SELLER_POSTS}${selectedProfile}/${userId}`;
    }
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(url);
    return data.data as ListResponse<HomePosts[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
export const getSellerHome = async (
  userId: number,
  tab: string,
  page: number,
) => {
  try {
    let url = `${Services.NEW_SELLER_POSTS}${userId}/?page=${page}`;

    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(url);
    return data.data as ListResponse<HomePosts[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getBuyerProfiles = async (userId: number, tab: string) => {
  try {
    const isNew = tab.includes('New');
    const url = isNew ? Services.NEW_SELLER : Services.MY_SELLER;
    const axiosClient = await getAxiosClient();
    console.log('userId', userId);

    const data = await axiosClient.get(url + userId);
    return data.data as ResponseData<SellerProfile[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
export const getSellerProfiles = async (userId: number, tab: string) => {
  try {
    const isNew = tab.includes('New');
    const url = isNew ? Services.NEW_BUYER : Services.MY_SELLER;
    const axiosClient = await getAxiosClient();
    console.log('userId', userId);

    const data = await axiosClient.get(url + userId + '/');
    return data.data as ResponseData<SellerProfile[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
export const Follow_User = async (
  seller_id: number,
  buyer_id: number,
  is_follow: boolean,
) => {
  try {
    const axiosClient = await getAxiosClient();

    const data = await axiosClient.post(Services.POST_USER_FOLLOW, {
      seller_id,
      buyer_id,
      is_follow,
    });
    return data.data as ResponseData<SellerProfile[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
