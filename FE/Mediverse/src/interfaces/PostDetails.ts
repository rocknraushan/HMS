export interface PostDetailsType {
  inner_feed_data: InnerFeedData;
  combined_products: CombinedProduct[];
}

export interface InnerFeedData {
  id: number;
  user: number;
  main_post: number;
  inner_post: string;
}

export interface CombinedProduct {
  id: number;
  brand_name: BrandName;
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  product_image: string;
  product_code: string;
  product_name: string;
  product_description: string;
  product_gst: string;
  product_offer: string;
  product_hsn_code: string;
  product_moq: string;
  product_quantity: string;
  product_discount: string;
  product_mrp: string;
  user_id: number;
  product_id: number;
  selectedQuantity?: string;
}

export interface BrandName {
  id: number;
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  brandName: string;
  image: string;
}
