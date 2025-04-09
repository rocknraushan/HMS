import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {Comment} from '../interfaces/Post';
import {ErrorData, ResponseData} from '../interfaces/Response';

export const getComments = async (postId: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.get(Services.COMMENTS, {
      params: {
        main_post_id: postId,
      },
    });
    return data.data as ResponseData<Comment[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const addComments = async (
  userId: number,
  postId: number,
  comment: string,
) => {
  try {
    const axiosClient = await getAxiosClient();
    const data = await axiosClient.post(Services.COMMENTS, {
      user_id: userId,
      main_post_id: postId,
      comment: comment,
      reply_id: '',
    });
    return data.data as Comment;
  } catch (e: any) {
    console.log("REQ",{
      user_id: userId,
      main_post_id: postId,
      comment: comment,
      reply_id: '',
    });
    
    throw e.response.data as ErrorData;
  }
};
