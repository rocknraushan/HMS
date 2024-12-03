import {Image as ImageType} from 'react-native-image-crop-picker';
import {HomePosts, PostLayout, PostTemplates} from '../interfaces/Post';
import { CombinedProduct, PostDetailsType } from '../interfaces/PostDetails';
import { Order } from '../interfaces/Order';
import { Address } from '../interfaces/User';

export type RootStackParamList = {
  SPLASH: undefined;
  WELCOME: undefined;
  SELECT_LANGUAGE: {hideBack?: boolean};
  HOME: undefined;
  LOGIN: undefined;
  REGISTER: undefined;
  VERIFY_OTP: undefined;
  GST_REGISTRATION: undefined;
  SELECT_CATEGORIES: {hideBack?: boolean};
  ESTABLISHMENT_PHOTOS: {hideBack?: boolean};
  CERTIFICATE_AUTHORIZATION: undefined;
  NOTIFICATIONS: undefined;
  MYORDERS: undefined;
  MYWISHLIST: undefined;
  MYSAVINGS: undefined;
  MYPAYMENTS: undefined;
  MYCART: {data: HomePosts, item: PostDetailsType, prod: CombinedProduct[]};
  SELLERPROFILE: {userId: number};
  COMMENTS: {data: HomePosts};
  PLACE_ORDER: {data: HomePosts, item: PostDetailsType};
  PLACE_ORDER_STEPS: {data: HomePosts, item: PostDetailsType, prod: CombinedProduct[], orderData: Order};
  SELECT_ADDRESS: {onSelect: (item: Address) => void};
  FILTER_BRAND: {hideSeller?: boolean; onSelect?: (items: string[]) => void};
  SIGNUP:undefined

  //Create Post
  CHOOSE_TEMPLATE: undefined;
  EDIT_TEMPLATE: {template: PostTemplates};
  ADD_POST_DETAILS: {
    template: PostTemplates;
    layout: PostLayout;
    header: string;
    subtitle: string;
    image: ImageType;
  };
  CREATE_INNER_POST: {reset?: boolean};
  SELECT_PRODUCTS: {image: ImageType};
  PREVIEW_POST: {postId: string};
  SCHEDULE_POST: undefined;

  POST_DETAILS: {data: HomePosts};

  // PROFILE

  PROFILE_HOME: undefined;
  MYPROFILE: undefined;
  MYSAVEDPOSTS: undefined;
  WALLET: undefined;
  FAQ: undefined;
  ORDER_VALUE: undefined;
  INVENTORY: undefined;
  POST_INSIGHTS: undefined;
  COLLECTIONS: undefined;
  ADD_MONEY: undefined;
  OrderValueDetails: {id: number,is_order: boolean};
  SAVED_DRAFTS: undefined;
  DEACTIVATE_DELETE: {delete?: boolean}
};

export const navStrings = {
  SPLASH: 'SPLASH',
  SIGNUP:'SIGNUP',
  LOGIN:'LOGIN'
};
