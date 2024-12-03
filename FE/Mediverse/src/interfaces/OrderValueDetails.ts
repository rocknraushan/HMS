export interface OfferPriceType {
  id: number;
  seller_id: number;
  user_id: number;
  total_amount: number;
  user_profile: UserProfile;
  products: Product[];
  total_quantity: number;
}

export interface UserProfile {
  legalName: string;
  tradeName: string;
  userimage: any;
}

export interface Product {
  product_id: number;
  order_quantity: number;
  main_post_id: number;
  inner_post_id: number;
  mrp: number;
  offer_price: any;
  discount: any;
  subtotal: any;
  gst_price: any;
  final_amount: any;
  product_image: string;
  main_post_type: string;
  new_price: string;
  product_name: string;
  product_code: string;
  
}
