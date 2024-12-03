import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {Category, PostType, SubCategoryType} from '../interfaces/Category';
import {ErrorData, ResponseData} from '../interfaces/Response';

export const getCategories = async () => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.GET_CATEGORIES);
    return data.data as ResponseData<Category[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getSubCategories = async () => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.GET_SUB_CATEGORIES);
    return data.data as ResponseData<SubCategoryType>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
export const getPostTypes = async () => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.GET_POST_TYPES);
    return data.data as ResponseData<PostType[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const submitCategories = async (userId: number, values: any) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.post(Services.SUBMIT_CATEGORIES, {
      user_id: userId,
      ...values,
      state: values?.state
        ? values?.state.map((item: string) => parseInt(item))
        : [],
      district: values?.district
        ? values?.district.map((item: string) => parseInt(item))
        : [],
    });
    console.log('DATA', {
      user_id: userId,
      ...values,
      state: values?.state
        ? values?.state.map((item: string) => parseInt(item))
        : [],
      district: values?.district
        ? values?.district.map((item: string) => parseInt(item))
        : [],
    });

    return data.data as ResponseData<any>;
  } catch (e: any) {
    console.log('ERR', e);

    throw e.response.response.data as ErrorData;
  }
};
