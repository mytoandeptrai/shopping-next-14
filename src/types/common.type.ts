export interface IListPaging<T extends unknown = any[]> {
  pagination: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  result: T[];
}

export interface IAxiosResponse<T extends unknown> {
  data: T;
  meta: {
    pagination: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export interface ObjectLiteral<T extends unknown = string> {
  [s: string]: T;
}

export interface IOption<T extends any = any> {
  name: string;
  value: T;
}

export interface ISelectOption<T extends any = any> {
  label: string;
  value: T;
}

export interface IdType {
  id: any;
}

type Join<S1, S2> = S1 extends string ? (S2 extends string ? `${S1}.${S2}` : never) : never;

export type Paths<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? Join<K, Paths<T[K]>> : K;
}[keyof T];

export type ElementProps<ElementType extends React.ElementType, PropsToOmit extends string = never> = Omit<
  React.ComponentPropsWithoutRef<ElementType>,
  PropsToOmit
>;

export interface IPagination {
  currentPage: number;
  nextPage: number;
  previousPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  lastPage: number;
}

export interface IPaging {
  page: number;
  limit: number;
  total?: number;
}

export interface IPaginationBeRes<T> {
  items: T[];
  totalItems: number;
  pagination: {
    currentPage: number;
    nextPage: number;
    previousPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    lastPage: number;
  };
}

export interface IBaseAPIResponse {
  code: number;
  message: string;
}
