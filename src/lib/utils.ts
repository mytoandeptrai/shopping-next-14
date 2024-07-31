import { IPaginationBeRes } from '@/types/common.type';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePagination<T>(
  items: T[],
  totalItems: number,
  currentPage: number,
  pageSize: number
): IPaginationBeRes<T> {
  return {
    items,
    totalItems,
    pagination: {
      currentPage,
      nextPage: currentPage + 1,
      previousPage: currentPage - 1,
      hasNextPage: pageSize * currentPage < totalItems,
      hasPreviousPage: currentPage > 1,
      lastPage: Math.ceil(totalItems / pageSize),
    },
  };
}

export const queryStringParser = (obj: Record<string, any>) => {
  const queryString = Object.keys(obj)
    .filter((key) => obj[key] !== '' && obj[key] !== undefined && obj[key] !== null)
    .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

  return queryString;
};
