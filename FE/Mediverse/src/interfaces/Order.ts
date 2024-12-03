export interface Order {
  id: number;
  unique_order_number: string;
  subtotal: any;
  gst_charge: any;
  total_amount: number;
  payment_status: boolean;
  seller_id: number;
  buyer_profile: any;
  billing_address: any;
  shipping_address: any;
  order_status: any;
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  payment_type: any;
  discount_coupon_id: any;
  discount_amount: any;
  transaction_date: any;
  transaction_id: any;
  transaction_number: any;
  payment_failed_reason: any;
  order_date: any;
  is_detail_filled: boolean;
  is_address_filled: boolean;
  is_order_summary: boolean;
  is_payment_done: boolean;
}
