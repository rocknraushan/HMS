export interface TokenData {
  user_data: UserData;
  profile_data: Profile;
  refresh: string;
  access: string;
}

export interface ProfileData {
  profile: Profile;
  user: UserData;
  addresses: Address[];
}

export interface Profile {
  id: number;
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  userimage: any;
  gstNumber: any;
  legalName: string;
  tradeName: string;
  gstStatus: string;
  dateOfRegistration: string;
  contitutionOfBuissness: any;
  aadharCardNumber: string;
  aadharFrontImage: string;
  aadharBackImage: string;
  longitude: string;
  lattitude: string;
  radius: string;
  user: number;
  gstType: number;
  category_id: number;
  subcategories: number[];
  preferred_segments: number[];
  states: number[];
  districts: number[];
}

export enum UserType {
  SELLER = 1,
  BUYER = 2,
}

export interface UserData {
  id: number;
  password: string;
  last_login: any;
  email: any;
  user_type: number;
  countryCode: string;
  phoneNumber: string;
  isVerified: boolean;
  additionalNumber: any;
  additionalisVerified: boolean;
  is_signup: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  is_gstRegistrationPage: boolean;
  is_selectCategoriesPage: boolean;
  is_establishPhotosPage: boolean;
  is_uploadDocumentsPage: boolean;
  country: number;
  account_type: any;
  user_permissions: any[];
  groups: any[];
  userPermissions: any[];
}
export interface Address {
  id: number;
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  address: string;
  addressType: number;
  user: number;
}
