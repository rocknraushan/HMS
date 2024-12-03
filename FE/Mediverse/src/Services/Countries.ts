import { Services } from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import { Country, DistrictType, State } from '../interfaces/Country';
import { ErrorData, ResponseData } from '../interfaces/Response';

export const getCountries = async () => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.COUNTRIES);
    return data.data as ResponseData<Country[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getStates = async () => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.GET_STATES);
    return data.data as ResponseData<State[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getDistricts = async (states: string[]) => {
  try {
    console.log("state",states);
    
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.post(Services.GET_DISTRICTS,{
      states: states
    });
    return data.data as ResponseData<DistrictType[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
