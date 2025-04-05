import { Image as ImageType } from 'react-native-image-crop-picker';

export type RootStackParamList = {
  SPLASH: undefined;
  WELCOME: undefined;
  SELECT_LANGUAGE: { hideBack?: boolean };
  ChangePasswordScreen: { token: string };
  ForgetPassword: undefined;
  HOME: undefined;
  LOGIN: undefined;
  REGISTER: undefined;
  VERIFY_OTP: undefined;
  GST_REGISTRATION: undefined;
  SELECT_CATEGORIES: { hideBack?: boolean };
  ESTABLISHMENT_PHOTOS: { hideBack?: boolean };
  CERTIFICATE_AUTHORIZATION: undefined;
  NOTIFICATIONS: undefined;
  MYORDERS: undefined;
  MYWISHLIST: undefined;
  MYSAVINGS: undefined;
  MYPAYMENTS: undefined;
  FILTER_BRAND: { hideSeller?: boolean; onSelect?: (items: string[]) => void };
  SIGNUP: undefined;
  BOTTOMTAB: undefined;
  UserProfileForm: undefined;

  //Create Post
  CHOOSE_TEMPLATE: undefined;
  ADD_POST_DETAILS: {
    header: string;
    subtitle: string;
    image: ImageType;
  };
  CREATE_INNER_POST: { reset?: boolean };
  SELECT_PRODUCTS: { image: ImageType };
  PREVIEW_POST: { postId: string };
  SCHEDULE_POST: undefined;


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
  OrderValueDetails: { id: number, is_order: boolean };
  SAVED_DRAFTS: undefined;
  DEACTIVATE_DELETE: { delete?: boolean }
};

export const navStrings = {
  SPLASH: 'SPLASH',
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
  BOTTOMTAB: 'BOTTOMTAB'
};
