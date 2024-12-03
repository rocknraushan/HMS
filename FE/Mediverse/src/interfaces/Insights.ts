export interface PostInsightType {
  id: number;
  user_id: number;
  post_type: PostTypeClass;
  status: Status;
  maincontent: null | string;
  video_link: null | string;
  schedule_post: Date | null;
}

export interface PostTypeClass {
  id: number;
  createdDate: Date;
  lastUpdatedDate: Date;
  isActive: boolean;
  post_type: PostTypeEnum;
}

export enum PostTypeEnum {
  BuyNow = 'Buy Now',
  GetQuote = 'Get Quote',
  Sponsored = 'Sponsored',
}

export enum Status {
  Expired = 'Expired',
  Live = 'Live',
  Scheduled = 'Scheduled',
}
