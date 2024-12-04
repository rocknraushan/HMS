import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import { Order } from '../interfaces/Order';
import {ProductType} from '../interfaces/Products';
import {ErrorData, ResponseData} from '../interfaces/Response';

export const getProductsAPI = async (userId: string) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.PRODUCTS + userId);
    return data.data as ResponseData<ProductType[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const addToWishlist = async (
  user_id: number,
  seller_id: number,
  postId: number,
  innerPost: number,
  products: number[],
) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.post(Services.WISHLIST, {
      user_id,
      seller_id,
      main_post_id: postId,
      inner_post_id: innerPost,
      product_ids: products,
    });
    return data.data as ResponseData<string>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const addToCart = async (
  user_id: number,
  seller_id: number,
  postId: number,
  innerPost: number,
  products: any[],
  amount: number
) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.post(Services.ADD_TO_CART+user_id+"/", {
      buyer_id: user_id,
      seller_id,
      main_post: postId,
      inner_post: innerPost,
      products: products,
      total_amount: amount
    });
    
    return data.data as ResponseData<string>;
  } catch (e: any) {
    console.log("CART",{
      buyer_id: user_id,
      seller_id,
      main_post: postId,
      inner_post: innerPost,
      products: products,
      total_amount: amount
    });
    
    throw e.response.data as ErrorData;
  }
};

export const addToGetQuote = async (
  user_id: number,
  seller_id: number,
  postId: number,
  innerPost: number,
  products: any[],
  amount: number
) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.post(Services.ADD_TO_GET_QUOTE, {
      buyer_id: user_id,
      seller_id,
      main_post: postId,
      inner_post: innerPost,
      products: products,
      total_amount: amount
    });
    
    return data.data as ResponseData<string>;
  } catch (e: any) {
    console.log("CART",{
      buyer_id: user_id,
      seller_id,
      main_post: postId,
      inner_post: innerPost,
      products: products,
      total_amount: amount
    });
    
    throw e.response.data as ErrorData;
  }
};

export const createOrder = async (
  user_id: number,
  seller_id: number,
  postId: number,
  innerPost: number,
  products: any[],
  amount: number
) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.post(Services.CREATE_ORDER, {
      buyer_id: user_id,
      seller_id,
      main_post: postId,
      inner_post: innerPost,
      products: products,
      total_amount: amount
    });
    
    return data.data as ResponseData<Order>;
  } catch (e: any) {
    
    throw e.response.data as ErrorData;
  }
};
