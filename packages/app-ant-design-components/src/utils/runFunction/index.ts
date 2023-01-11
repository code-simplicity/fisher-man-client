/**
 * 运行函数
 * @param value 初始参数，任意值
 * @param rest 剩余参数
 */
export const runFunction = <T extends any[]>(value: any, ...rest: T) => {
  /**
   * 如果是函数则进行递归
   */
  if (typeof value === 'function') {
    return value(...rest);
  }
  return value;
};
