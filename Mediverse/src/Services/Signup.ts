import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {Country} from '../interfaces/Country';
import {ErrorData, ResponseData} from '../interfaces/Response';
import {CreateUser} from '../interfaces/Signup';
import { ProfileData, TokenData } from '../interfaces/User';

export const createUser = async (phone: string, country: Country,userType: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.post(Services.CREATE_USER, {
      countryCode: country.countryCode,
      countryId: country.id,
      number: phone,
      user_type: userType
    });
    return data.data as ResponseData<CreateUser>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const verifyUser = async (userid: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.post(Services.VERIFY_USER, {
      user_id: userid,
      is_verified: true,
    });
    return data.data as ResponseData<TokenData>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const resendOTP = async (phone: string) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.post(Services.RESEND_OTP, {
      number: phone,
    });
    return data.data as ResponseData<TokenData>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getUserProfile = async (userId: number) => {
  try {
    const axiosClient = await getAxiosClient();
    console.log("Services.GET_PROFILE+userId",Services.GET_PROFILE+userId)
    const data = await axiosClient.get(Services.GET_PROFILE+userId);
    return data.data as ResponseData<ProfileData>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
