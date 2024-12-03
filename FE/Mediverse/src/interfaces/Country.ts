export interface Country {
  id: number;
  country: string;
  countryCode: string;
  flag: string;
}

export interface State {
  id: number;
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  state: string;
  country: number;
}

export interface DistrictType {
  state_id: number
  state_name: string
  districts: District[]
}

export interface District {
  id: number
  district: string
  state: number
}