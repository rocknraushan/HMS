export interface Category {
  id: number;
  createdDate: string;
  lastUpdatedDate: string;
  isActive: boolean;
  categoryName: string;
}

export interface SubCategoryType {
  maincategory: Maincategory;
  subategory: SubCatItem[];
  prefferedsegment: Prefferedsegment[];
}

export interface Maincategory {
  id: number;
  categoryName: string;
}

export interface SubCatItem {
  id: number;
  subCategoryName: string;
  image: string;
}

export interface Prefferedsegment {
  id: number;
  preferredSegmentName: string;
  image: string;
}

export interface PostType {
  id: number
  createdDate: string
  lastUpdatedDate: string
  isActive: boolean
  post_type: string
}
