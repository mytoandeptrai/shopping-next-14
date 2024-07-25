import { ExceptionCode } from '@/constants/exception-code';

export interface ApiErrorResponse {
  code: ExceptionCode;
  message: string;
  data: null;
}

export interface ApiSuccessResponse<T> {
  code: number;
  message: string;
  data: T;
}
