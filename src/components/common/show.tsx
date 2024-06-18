import type { FCC } from '@/types';
import React from 'react';

export const Show: FCC<{ when?: boolean }> = (props) => {
  return <>{props.when ? <>{props.children}</> : null}</>;
};
