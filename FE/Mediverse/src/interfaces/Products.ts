export interface ProductType {
  id: number;
  brand_name: BrandName;
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  product_image: string;
  product_code: string;
  product_name: string;
  product_description: string;
  product_mrp: string;
  product_gst: string;
  product_offer: string;
  product_hsn_code: string;
  product_moq: string;
  product_quantity: string;
  product_discount: string;
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

export interface InnerFeedResponse {
  inner_feed_data: InnerFeedData;
  combined_products: ProductType[];
}

export interface InnerFeedData {
  id: number;
  user: number;
  main_post: number;
  inner_post: string;
}
