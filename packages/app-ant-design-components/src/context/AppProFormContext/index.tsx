import type { FormInstance } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { createContext, MutableRefObject } from 'react';

interface AppProFormInstanceType<T> {
  /**
   * 获取格式化之后的所有数据
   * @param nameList boolean
   * @param omitNlUd boolean
   */
  getFieldsFormatValue?: (nameList?: true, omitNlUd?: boolean) => T;
  /**
   * 获取格式化之后的单个数据
   * @param nameList
   */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /**
   * 获取格式化之后的单个数据
   * 获取的值为 {key： {key： value}}
   * @param paramsNameList
   */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /**
   * 验证字段之后返回格式化之后的所有数据
   * @param nameList (string|number[])
   */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
}

const AppProFormContext = createContext<
  AppProFormInstanceType<any> & {
    formRef?: MutableRefObject<FormInstance<any>>;
  }
>({});
export { AppProFormContext, AppProFormInstanceType };
