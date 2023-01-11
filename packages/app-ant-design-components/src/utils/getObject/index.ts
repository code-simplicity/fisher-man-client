/**
 * 从一共对象中安全的取出对应的值，因为有些特殊符号会不能识别
 * @param originMap 源对象
 * @param path 需要的
 * @param defaultValue 默认值
 */
export const getSafetyObjectValue = (
  originMap: Record<string, any>,
  path: string,
  defaultValue?: string,
): string | undefined => {
  // 正则拼接
  const paths = path.replace(/\[(\d+)]/g, '.$1').split('.');
  let originResult = originMap;
  let message = defaultValue;
  for (const p of paths) {
    message = Object(originResult)[p];
    originResult = Object(originResult)[p];
    if (message === undefined) {
      return defaultValue;
    }
  }
  return message;
};
