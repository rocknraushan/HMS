import { PostTypeResponse } from "./Post";

export interface ResponseData<T> {
  message: string;
  data: T;
  status: string;
  code: number;
}
export interface ListResponse<T> {
  count: number;
  next: string;
  previous: any;
  results: T;
  has_next: boolean;
}
export interface ErrorData {
  message: string;
  error: string;
  status: string;
  code: number;
}
