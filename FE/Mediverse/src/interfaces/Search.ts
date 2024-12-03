export interface SearchResultType {
  product_id: number;
  product_name: string;
  product_image: string;
  brand_name: string;

  sellers?: Seller[]
}

export interface Seller {
  seller_id: number
  legal_name: string
  profile_image?: string
  product_offer: string
  product_mrp: string
  product_image: string
  inner_feeds: InnerFeed[]
  savings: number
  savings_message: string
}

export interface InnerFeed {
  id: number
  inner_post: string
  main_post: number
}