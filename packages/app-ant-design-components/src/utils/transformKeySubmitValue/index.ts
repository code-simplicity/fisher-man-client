import { isNil, isPlainObject, merge } from 'lodash';
import Set from 'rc-util/es/utils/set';
import { Key } from 'react';
import { AppSearchTransformKeyFn } from '../typing';

export type DataFormatMapType = Record<
  string,
  AppSearchTransformKeyFn | undefined
>;

/**
 * 用于提交进行数据的装换
 * @param values 值
 * @param dataFormatMapRow 格式化方式 支持类型看
 * @param omit 省略操作
 */
export const transformKeySubmitValue = <T extends object = any>(
  values: T,
  dataFormatMapRow: Record<
    string,
    AppSearchTransformKeyFn | undefined | DataFormatMapType
  >,
  omit: boolean = true,
) => {
  const dataFormatMap = Object.keys(dataFormatMapRow).reduce((ret, key) => {
    const value = dataFormatMapRow[key];
    // 判断是否为空或者是undefined isNil是lodash提供的判null和undefined函数
    if (!isNil(value)) {
      // @ts-ignore
      ret[key] = value! as AppSearchTransformKeyFn;
    }
    return ret;
  }, {} as Record<string, AppSearchTransformKeyFn>);
  /**
   * 如果格式化的类型长度只有1，那就直接返回values
   */
  if (Object.keys(dataFormatMap).length < 1) {
    return values;
  }
  /**
   * 判断点前是否存在window作用域，有可能链路丢失
   */
  if (typeof window === 'undefined') {
    return values;
  }
  /**
   * 判断 values 是 string | null | Array | Blob类型 其中之一，直接返回
   */
  if (typeof values !== 'object' || isNil(values) || values instanceof Blob) {
    return values;
  }
  /**
   * 最终的values值
   * 如果是数据就是声明数据
   * 是对象那就直接声明对象
   */
  let finalValues: any = Array.isArray(values) ? [] : ({} as T);

  const gen = (tempValues: T, parentsKey?: Key[]) => {
    let result = Array.isArray(tempValues) ? ([] as any) : ({} as T);
    /**
     * 如果模板值为空孩或者是undefined，返回
     */
    if (isNil(tempValues)) {
      return result;
    }

    Object.keys(tempValues).forEach((entityKey) => {
      /**
       * key 进行拍平 得配置es2019的版本，数组才支持flat
       */
      const key = parentsKey
        ? [parentsKey, entityKey]?.flat(1)
        : [entityKey]?.flat(1);
      const itemValue = tempValues[entityKey];
      // @ts-ignore
      const transformFunction = gen(dataFormatMap, key);

      const transformArray = (transformFn: any) => {
        if (!Array.isArray(transformFn)) return entityKey;
        transformFn.forEach((fn: any, idx: number) => {
          if (!fn) return;
          if (typeof fn === 'function') {
            itemValue[idx] = fn(itemValue, entityKey, tempValues);
          }
          /**
           * 判断fn是对象并且不等于数组
           */
          if (typeof fn === 'object' && !Array.isArray(fn)) {
            Object.keys(fn).forEach((curryKey) => {
              if (typeof fn[curryKey] === 'function') {
                const res = fn[curryKey](
                  tempValues[entityKey][idx][curryKey],
                  entityKey,
                  tempValues,
                );
                itemValue[idx][curryKey] =
                  typeof res === 'object' ? res[curryKey] : res;
              }
            });
            /**
             * 是数组就进行递归
             */
            if (typeof fn === 'object' && Array.isArray(fn)) {
              transformArray(fn);
            }
          }
        });
        return entityKey;
      };

      /**
       * 转换
       */
      const transform = () => {
        const tempKey =
          typeof transformFunction === 'function'
            ? transformFunction?.(itemValue, entityKey, tempValues)
            : transformArray(transformFunction);
        /**
         * 判断是数组就直接设置值
         */
        if (Array.isArray(tempKey)) {
          result = Set(result, tempKey, itemValue);
          return;
        }
        if (typeof tempKey === 'object' && !Array.isArray(tempKey)) {
          finalValues = {
            ...finalValues,
            ...tempKey,
          };
        } else if (typeof tempKey === 'object' && Array.isArray(tempKey)) {
          result = { ...result, ...tempKey };
        } else if (tempKey) {
          result = Set(result, [tempKey], itemValue);
        }
      };
      /**
       * 如果是转换函数存在，就提前渲染
       */
      if (transformFunction && typeof transformFunction === 'function') {
        transform();
      }

      if (typeof window === 'undefined') return;
      if (isPlainObject(itemValue)) {
        const genValues = gen(itemValue, key);
        if (Object.keys(genValues).length < 1) return;
        result = Set(result, [entityKey], genValues);
        return;
      }
      // 转换
      transform();
    });
    return omit ? result : tempValues;
  };
  /**
   * 装载最终值
   */
  finalValues =
    Array.isArray(values) && Array.isArray(finalValues)
      ? [...gen(values)]
      : merge({}, gen(values), finalValues);

  return finalValues as T;
};
