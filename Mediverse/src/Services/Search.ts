import { Services } from "../HttpService";
import getAxiosClient from "../HttpService/AxiosClient";
import { ErrorData, ResponseData } from "../interfaces/Response";
import { SearchResultType } from "../interfaces/Search";

export const getSearchResults = async (userId: number,search: string) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.SEARCH,{
      params: {
          user_id: userId,
          search: search
      }
    });
    return data.data as ResponseData<SearchResultType[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getSearchDetails = async (userId: number,product_id: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.SEARCH_DETAILS,{
      params: {
          user_id: userId,
          product_id: product_id
      }
    });
    return data.data as ResponseData<SearchResultType>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
