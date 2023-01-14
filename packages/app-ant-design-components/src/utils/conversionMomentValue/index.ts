import type { NamePath } from 'antd/es/form/interface';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { isNil, isPlainObject } from 'lodash';
import Get from 'rc-util/es/utils/get';
import { AppProFieldValueType } from '../typing';

/**
 * 插件支持是哪一个季节，可以直接去官网看具体的插件使用场景
 * https://dayjs.gitee.io/docs/zh-CN/plugin/plugin
 */
dayjs.extend(quarterOfYear);

/**
 * 格式化的类型
 */
type DataFormatter =
  | 'number'
  | 'string'
  | ((value: dayjs.Dayjs, valueType: string) => string | number)
  | false;

export const dateFormatterMap = {
  /**
   * 时分秒
   */
  time: 'HH:mm:ss',
  timeRange: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateWeek: 'YYYY-wo',
  dateMonth: 'YYYY-MM',
  dateQuarter: 'YYYY-[Q]Q',
  dateYear: 'YYYY',
  dateRange: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateTimeRange: 'YYYY-MM-DD HH:mm:ss',
};

/**
 * 处理moment和dayjs中的类型判断，判断是isMoment格式化时间还是dayjs，
 * 在moment中会存在_isAMomentObject的类型
 * @param value
 */
const isMoment = (value: any): boolean => !!value?._isAMomentObject;

/**
 * 根据不同的格式转换时间 dayjs
 * @param value
 * @param dateFormatter
 * @param valueType
 */
const convertMoment = (
  value: dayjs.Dayjs,
  dateFormatter:
    | string
    | ((value: dayjs.Dayjs, valueType: string) => string | number)
    | false,
  valueType: string,
) => {
  if (!dateFormatter) return value;
  if (dayjs.isDayjs(value) || isMoment(value)) {
    if (dateFormatter === 'number') {
      return value.valueOf();
    }
    if (dateFormatter === 'string') {
      return value.format(dateFormatterMap[valueType] || 'YYYY-MM-DD HH:mm:ss');
    }
    /**
     * 不是字符串，类型是字符串的
     */
    if (typeof dateFormatter === 'string' && dateFormatter !== 'string') {
      return value.format(dateFormatter);
    }
    if (typeof dateFormatter === 'function') {
      return dateFormatter(value, valueType);
    }
  }
  return value;
};

/**
 * moment的数据转换，时间格式化 将dayjs转为string 将all删除
 * @param value 值
 * @param dateFormatter 格式化
 * @param valueTypeMap 类型
 * @param omitNil 是否为null或者是undefined
 * @param parentKey 父的key
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const conversionMomentValue = <T extends {} = any>(
  value: T,
  dateFormatter: DataFormatter,
  valueTypeMap: Record<
    string,
    | {
        valueType: AppProFieldValueType;
        dateFormat: string;
      }
    | any
  >,
  omitNil?: boolean,
  parentKey?: NamePath,
): T => {
  const tempValue = {} as T;
  if (typeof window === 'undefined') return value;
  if (
    typeof value !== 'object' ||
    isNil(value) ||
    value instanceof Blob ||
    Array.isArray(value)
  ) {
    return value;
  }
  Object.keys(value as Record<string, any>).forEach((key) => {
    const namePath = parentKey ? ([parentKey, key].flat(1) as string[]) : [key];
    /**
     * 获取类型的map
     */
    const valueFormatMap = Get(valueTypeMap, namePath) || 'text';

    let valueType = 'text';
    let dateFormat: string | undefined;
    if (typeof valueFormatMap === 'string') {
      valueType = valueTypeMap as AppProFieldValueType;
    } else if (valueFormatMap) {
      valueType = valueTypeMap.valueType;
      dateFormat = valueFormatMap.dateFormat;
    }

    const itemValue = (value as Record<string, any>)[key];
    if (isNil(itemValue) && omitNil) {
      return;
    }

    // 处理嵌套的情况
    if (
      isPlainObject(itemValue) &&
      !Array.isArray(itemValue) &&
      !dayjs.isDayjs(itemValue) &&
      !isMoment(itemValue)
    ) {
      tempValue[key] = conversionMomentValue(
        itemValue,
        dateFormatter,
        valueTypeMap,
        omitNil,
        [key],
      );
      return;
    }

    /**
     * 处理FormList 的 value
     */
    if (Array.isArray(itemValue)) {
      tempValue[key] = itemValue.map((item, index) => {
        if (dayjs.isDayjs(item) || isMoment(item)) {
          return convertMoment(item, dateFormat || dateFormatter, valueType);
        }
        return conversionMomentValue(
          itemValue,
          dateFormatter,
          valueTypeMap,
          omitNil,
          [key, `${index}`],
        );
      });
      return;
    }
    tempValue[key] = convertMoment(
      itemValue,
      dateFormat || dateFormatter,
      valueType,
    );
  });

  return tempValue;
};
