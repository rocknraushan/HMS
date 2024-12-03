export interface CollectionsType {
  user_id: number;
  order_id: number;
  order_date: string;
  legalName: string;
  tradeName: string;
  payment_status: boolean;
  total_amount: string;
  payment_type: string;
  order_status: string;
}
export interface DashboardCollection {
  user_id: number;
  total_completed_amount: number;
  total_pending_amount: number;
  total_amount: number;
}

export interface DashboardInventory {
  user_id: number;
  available_count: number;
  out_of_stock_count: number;
  limited_stock_count: number;
}

export interface DashboardOrderType {
  user_id: any;
  seller_id: number;
  pending_total: number;
  dispatched_total: number;
  delivered_total: number;
  return_total: number;
  completed_total: number;
  overall_total: number;
}
