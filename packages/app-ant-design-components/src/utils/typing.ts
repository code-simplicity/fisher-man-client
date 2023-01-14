import { ReactNode, ReactText } from 'react';

/**
 * 组件库的组件字段
 */
export interface AppProFieldValueWithFieldProps {}

/**
 * 排除AppProFieldValueWithFieldProps中是any类型的key
 */
export type AppProFieldValueType = Extract<
  keyof AppProFieldValueWithFieldProps,
  any
>;

/**
 * 请求配置类型
 */
export type AppRequestOptionsType = {
  /**
   * 标签
   */
  label?: ReactNode;
  /**
   * value
   */
  value?: ReactText;
  /**
   * 配置类型
   */
  optionType?: 'optionGroup' | 'option';
  /**
   * 配置
   */
  options?: Omit<AppRequestOptionsType, 'children' | 'optionType'>;
  [key: string]: any;
};

/**
 * 字段请求返回的数据
 */
export type AppProFieldRequestData<U = any> = (
  params: U,
  props: any,
) => Promise<AppRequestOptionsType[]>;

/**
 * field字段的类型
 */
export type AppProFieldValueObjectType = {
  /**
   * 类型
   * progress 进度条
   * money 钱
   * percent 百分比
   * image 图片
   */
  type: 'progress' | 'progress' | 'money' | 'image';
  /**
   * 状态
   * normal 正常
   * active 激活
   * success 成功
   * exception 异常
   * undefined 未定义
   */
  status?: 'normal' | 'active' | 'success' | 'exception' | undefined;
  /**
   * 多语言
   */
  locale?: string;
  /** start
   * Percent 百度比组件
   */
  /**
   * 展示符号
   */
  showSymbol?: ((value: any) => boolean) | boolean;
  /**
   * 展示颜色
   */
  showColor?: boolean;
  /**
   * 精度
   */
  precision?: number;
  /**
   * 金币符号
   */
  moneySymbol?: boolean;
  /**
   * 请求
   */
  request?: AppProFieldRequestData;
  /** end
   * Percent 百度比组件
   */
  /**
   * Image组件
   */
  width?: number;
};

/**
 * 组件库的组件的类型扫描
 */
export type AppProSchemaValueType<V> =
  | (V | AppProFieldValueType)
  | AppProFieldValueObjectType;

/**
 * 搜索数据的转换函数
 */
export type AppSearchTransformKeyFn = (
  value: any,
  namePath: string,
  allValues: any,
) => string | Record<string, any>;
