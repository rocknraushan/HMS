import moment from 'moment';
import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {Order} from '../interfaces/Order';
import {OrderSummaryType, OrderValueType} from '../interfaces/OrderSummary';
import {ErrorData, ResponseData} from '../interfaces/Response';
import {OfferPriceType} from '../interfaces/OrderValueDetails';

export interface AddressData {
  billing_address_id: number;
  shipping_address_id: number;
}

export const addAddressToOrder = async (orderId: number, data: AddressData) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.post(Services.ADD_ORDER_ADDRESS, {
      order_id: orderId,
      ...data,
    });
    return result.data as ResponseData<Order>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const placeOrder = async (orderId: number, data: any) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.post(Services.FINAL_ORDER, {
      order_id: orderId,
      ...data,
    });
    return result.data as ResponseData<Order>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const completeTransaction = async (
  orderId: number,
  summary: OrderSummaryType,
  data: any,
) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.post(Services.COMPLETE_TRANSACTION, {
      order_id: orderId,
      payment_type: 1,
      transaction_date: moment().format('YYYY-MM-DD'),
      order_date: moment().format('YYYY-MM-DD'),
      transaction_id: 'TRANS12345',
      payment_status: true,
      order_status: 1,
      subtotal: summary.subtotal,
      shipping: summary.gst_charge,
      gst: summary.gst_charge,
      total: summary.total_amount,
    });
    return result.data as ResponseData<Order>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getOrderSummary = async (orderId: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.get(Services.FINAL_ORDER + orderId);
    return result.data as OrderSummaryType;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
export const getOrderValue = async (
  userId: number,
  post_type_id: string,
  order_status_ids: string,
  order_time?: string,
  start_date?: string,
) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.get(Services.COMBINE_ORDER_DETAIL, {
      params: {
        user_id: userId,
        post_type_id,
        order_status_ids,
        order_time,
        start_date,
      },
    });
    return result.data as ResponseData<OrderValueType[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getOfferPrice = async (quoteId: number,is_order: boolean) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.get(Services.GET_OFFER_PRICE, {
      params: {
        get_quote_id: is_order ? undefined :quoteId,
        order_id: is_order ? quoteId :undefined,
      },
    });
    return result.data as ResponseData<OfferPriceType>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const setOfferPrice = async (
  quoteId: number,
  products: any[],
  amount: number,
) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.post(Services.SET_OFFER_PRICE, {
      get_quote_id: quoteId,
      products: products,
      final_amount: amount,
    });
    return result.data as ResponseData<OfferPriceType>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
