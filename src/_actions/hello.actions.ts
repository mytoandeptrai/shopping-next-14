'use server';

import { db } from '@/config';

export async function getHello() {
  try {
    await db.connect();
    return { msg: 'GET' };
  } catch (error: any) {
    return {
      errorMessage: error?.message || '',
    };
  }
}
