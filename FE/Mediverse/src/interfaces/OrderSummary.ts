export interface OrderSummaryType {
  order_id: number;
  gst_charge: number;
  total_amount: number;
  subtotal: number;
  is_order_summary: boolean;
  products: Product[];
}

export interface Product {
  product_id: number;
  product_code: string;
  brand_name: string;
  product_name: string;
  product_description: string;
  product_gst: number;
  product_image: string;
  user_product_id: number;
  product_offer: string;
  product_hsn_code: string;
  product_moq: string;
  product_quantity: string;
  product_discount: string;
  product_mrp: string;
}

export interface OrderValueType {
  id: number
  seller_id: number
  user_id: number
  legalName: string
  tradeName: string
  profile_image?: string
  order_date?: string
  order_status?: string
  total_amount: string
  post_type?: string;
  payment?: string
  main_post_types: MainPostType[]
  unique_order_number: string;
  is_order: string;
  is_get_quote: string;
}

export interface MainPostType {
  id: number
  isActive: boolean
  post_type: string
  main_post_image?: string
}