import { useRequest } from 'ahooks';
import { Key, useEffect, useRef, useState } from 'react';

/**
 * 请求的id
 */
let requestId = 0;

/**
 * 请求的类型， 返回一个Promise
 */
export type IProRequest<T, U = Record<string, any>> = (
  params: U,
  props: any,
) => Promise<T>;

/**
 * 远程获取数据的hooks
 * 返回的是具体的数据，其实这块我想做的是返回一个request，因为使用的是useRequest，其实就可以自动进行控制了，先看看效果，不行再更改
 * @param props
 */
export const useFetchData = <
  T,
  U extends Record<string, any> = Record<string, any>,
>(props: {
  request?: IProRequest<T, U>;
  params?: U;
  proFieldKey?: Key;
}): [unknown, boolean] => {
  /**
   * 缓存的key，该key变化之后会触发接口的重新查询，可以用于表单筛选项选择条件进行查询，默认值开启的
   */
  const [cacheKey] = useState(() => {
    if (props.proFieldKey) {
      return props.proFieldKey.toString();
    }
    requestId += 1;
    return requestId.toString();
  });

  const proFieldKeyRef = useRef(cacheKey);

  /**
   * 触发请求，返回的是一个promise
   */
  const fetchRequest = async () => {
    const fetchData = await props?.request?.(props.params as U, props);
    return fetchData;
  };

  useEffect(() => {
    return () => {
      requestId += 1;
    };
  }, []);

  const { data, error, loading } = useRequest<T | undefined, any[]>(
    fetchRequest,
    {
      manual: true, // 初始化不支持请求
      refreshDeps: [proFieldKeyRef?.current], // 当前的ref变换就触发重新查询
    },
  );

  return [data || error, loading];
};
