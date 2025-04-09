import { Services } from "../HttpService";
import getAxiosClient from "../HttpService/AxiosClient";
import { OrderStatus } from "../interfaces/OrderStatus";
import { ErrorData, ResponseData } from "../interfaces/Response";

export const getOrderStatus = async () => {
    try {
      const axiosClient = await getAxiosClient();
      const data = await axiosClient.get(Services.GET_ORDER_STATUS);
      return data.data as ResponseData<OrderStatus[]>;
    } catch (e: any) {
      throw e.response.data as ErrorData;
    }
  };