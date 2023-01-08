import { useEffect, useRef } from 'react';

/**
 * 获取上一次的值 hooks
 * @param state
 */
export const usePrevious = <T,>(state: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
};
