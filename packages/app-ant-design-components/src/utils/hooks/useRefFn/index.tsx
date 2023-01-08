import { useCallback, useRef } from 'react';

/**
 * 获取ref的hooks
 * @param reFn
 */
export const useRefFn = <T extends (...args: any) => any>(reFn: T) => {
  const ref = useRef<any>(null);
  ref.current = reFn;
  return useCallback((...rest: Parameters<T>): ReturnType<T> => {
    return ref.current?.(...(rest as any));
  }, []);
};
