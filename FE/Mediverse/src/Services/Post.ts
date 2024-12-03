import moment from 'moment';
import {Services} from '../HttpService';
import getAxiosClient from '../HttpService/AxiosClient';
import {AddPostData, HomePosts, PostLayout, PostTypeResponse} from '../interfaces/Post';
import {InnerFeedData, InnerFeedResponse} from '../interfaces/Products';
import {ErrorData, ResponseData} from '../interfaces/Response';
import {Image as ImageType} from 'react-native-image-crop-picker';
import { PostDetailsType } from '../interfaces/PostDetails';

export const addPostType = async (userId: number, isImage: string) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.post(Services.ADD_POST_TYPE, {
      id: userId,
      is_image: isImage,
    });
    return result.data as ResponseData<PostTypeResponse>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const addMainPost = async (
  userId: number,
  values: AddPostData,
  postData: PostTypeResponse,
) => {
  try {
    const axiosClient = await getAxiosClient();
    const formData = new FormData();
    formData.append('user', userId);
    formData.append('header', values.header);
    formData.append('footer', values.subtitle);
    formData.append('header_hex_code', values.header_hex_code);
    formData.append('footer_hex_code', values.footer_hex_code);
    formData.append(
      'vertical',
      values.layout === PostLayout.POTRAIT ? '1' : '0',
    );
    formData.append(
      'is_horizontal',
      values.layout === PostLayout.LANDSCAPE ? '1' : '0',
    );
    formData.append('post_id', postData.id);
    var filename = values.image?.path.replace(/^.*[\\/]/, '');

    formData.append('maincontent', {
      name: filename,
      uri: values.image?.path,
      type: values.image?.mime,
    });
    const result = await axiosClient.post(Services.ADD_MAIN_POST, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data as ResponseData<PostTypeResponse>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const addPostContent = async (
  userId: number,
  post_id: number,
  values: any,
) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.post(Services.ADD_MAIN_POST_CONTENT, {
      id: userId,
      post_id: post_id,
      ...values,
    });
    return result.data as ResponseData<PostTypeResponse>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const addInnerFeed = async (
  userId: number,
  post_id: number,
  image: ImageType,
) => {
  try {
    const axiosClient = await getAxiosClient();
    var filename = image?.path.replace(/^.*[\\/]/, '');
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('main_post_id', post_id);

    formData.append('inner_post', {
      name: filename,
      uri: image?.path,
      type: image?.mime,
    });
    const result = await axiosClient.post(Services.INNER_FEED, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data as ResponseData<InnerFeedResponse>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
export const addInnerFeedProduct = async (
  userId: number,
  innerFeed: InnerFeedData,
  productIds: string[],
) => {
  try {
    const axiosClient = await getAxiosClient();
    const ids = productIds.join(',');

    const result = await axiosClient.post(Services.INNER_FEED_PRODUCT, {
      user_id: userId,
      main_post_id: innerFeed.main_post,
      inner_post_id: innerFeed.id,
      product_ids: ids,
    });
    return result.data as ResponseData<any>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getPost = async (postId: string) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.get(Services.ADD_MAIN_POST + postId);
    return result.data as ResponseData<PostTypeResponse>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getInnerFeed = async (postId: string) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.get(Services.GET_INNER_FEED + postId);
    return result.data as ResponseData<InnerFeedResponse[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const managePost = async (
  userId: number,
  postId: number,
  expiry: string,
  schedule: boolean,
  date?: Date,
) => {
  try {
    const axiosClient = await getAxiosClient();

    const request: any = {
      user_id: userId,
      main_post_id: postId,
      is_schedule_post: schedule ? 'True' : 'False',
      expire_post: expiry,
      status: schedule?  "1" :"0"
    };
    if (date && schedule) {
      request['schedule_post_time'] = moment(date).format('hh:mm');
      request['schedule_post_date'] = moment(date).format('YYYY-MM-DD');
    }
    if(expiry !== "") {

      request['expire_post'] =expiry;
    }
 
    console.log("REQUEST",request);
    
    const result = await axiosClient.post(Services.MANAGE_POST, request);
    return result.data as ResponseData<InnerFeedResponse[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};


export const getPostDetails = async (postId: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.get(Services.POST_DETAILS + postId);
    return result.data as ResponseData<PostDetailsType[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};


export const getPostInsights = async (userId: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.get(Services.POST_INSIGHTS + userId);
    return result.data as ResponseData<HomePosts[]>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};

export const getviewprofilePost = async (userID: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.get(Services.GET_USER_PROFILE_POSTS + userID);
    return result.data as ResponseData<PostTypeResponse>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
export const getviewprofileProduct = async (userID: number) => {
  try {
    const axiosClient = await getAxiosClient();
    const result = await axiosClient.get(Services.PRODUCT_INSIDE_PROFILE + userID);
    return result.data as ResponseData<PostTypeResponse>;
  } catch (e: any) {
    throw e.response.data as ErrorData;
  }
};
