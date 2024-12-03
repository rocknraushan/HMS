import {Image as ImageType} from 'react-native-image-crop-picker';
import {Prefferedsegment, SubCatItem} from './Category';
import {Profile} from './User';

export enum PostTemplates {
  IMAGE = 'Image',
  VIDEO = 'Video',
}
export enum PostLayout {
  POTRAIT = 'POTRAIT',
  LANDSCAPE = 'LANDSCAPE',
}

export interface PostProps {
  template: PostTemplates;
  layout: PostLayout;
  header: string;
  subtitle: string;
  image: ImageType;
}

export interface AddPostData {
  header: string;
  subtitle: string;
  image?: ImageType;
  layout: PostLayout;
  footer_hex_code: string;
  header_hex_code: string
}

export interface PostTypeResponse {
  id: number;
  userimage?: string;
  subcategories: SubCatItem[];
  preferred_segments: Prefferedsegment[];
  ribben: string;
  post_type: {
    post_type: string;
  }

  footer_hex_code: string;
  header_hex_code: string;
  expire_at: any;
  schedule_post: any;
  is_tax_available: any;
  video_link: any;
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  is_image: boolean;
  maincontent: any;
  header: string;
  footer: string;
  vertical: boolean;
  is_horizontal: boolean;
  description: any;
  discount: any;
  delivery_time: any;
  is_schedule_post: boolean;
  status?: number;
  user: number;
  profile?: Profile;
}

export interface HomePosts {
  maincontent?: string;
  video_link?: string;
  header: string;
  user_id: number;
  footer: string;
  vertical: boolean;
  is_horizontal: boolean;
  description?: string;
  header_hex_code?: string;
  post_type: {
    id: string;
    createdDate: string;
    lastUpdatedDate: string;
    isActive: boolean;
    post_type: string;
  };
  footer_hex_code?: string;
  legalName: string;
  tradeName: string;
  profile: ProfileHome;
  post_id: number;
}

export interface ProfileHome {
  id: number;
  userimage: any;
}

export interface Comment {
  id: number;
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  comment: string;
  user_id: number;
  main_post_id: number;
  reply_id?: number;
  profile: CommentProfile;
}

export interface CommentProfile {
  legalName: string;
  tradeName: string;
  profile_image?: string;
}

export interface SellerProfile {
  seller_id: number;
  profile_image: string;
  post_count: number;
}
