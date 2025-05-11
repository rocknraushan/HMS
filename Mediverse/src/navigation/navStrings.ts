import { Image as ImageType } from 'react-native-image-crop-picker';

export type RootStackParamList = {
  SPLASH: undefined;
  ChooseRoleScreen: undefined;
  WELCOME: undefined;
  SELECT_LANGUAGE: { hideBack?: boolean };
  ChangePasswordScreen: { token?: string,otpRequired:boolean, email: string  };
  ForgetPassword: undefined;
  HOME: undefined;
  LOGIN:undefined;
  REGISTER: undefined;
  VERIFY_OTP: undefined;
  SELECT_CATEGORIES: { hideBack?: boolean };
  NOTIFICATIONS: undefined;
  SIGNUP: undefined;
  BOTTOMTAB: undefined;
  UserProfileForm: undefined;
  DoctorTab: undefined;
  TermsScreen:undefined;
  DoctorDetail: undefined;
  ProfileScreen: undefined;
  MyBookings: undefined;
  BookAppointmentScreen: undefined;
};

export const navStrings = {
  SPLASH: 'SPLASH',
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
  BOTTOMTAB: 'BOTTOMTAB'
};
