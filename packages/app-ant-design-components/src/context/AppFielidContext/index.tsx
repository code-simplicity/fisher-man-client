import type { FormItemProps } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import { createContext } from 'react';
import { CommonFormProps } from '../../AppBaseForm/typing';
import { FieldProps, GroupProps } from '../../typing';
import {
  AppProSchemaValueType,
  AppSearchTransformKeyFn,
} from '../../utils/typing';

type AppFieldContextProps = {
  /**
   * 字段的props
   */
  fieldProps?: FieldProps<unknown>;
  /**
   * 字段的props
   */
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
  setFieldValueType?: (
    name: NamePath,
    obj: {
      valueType?: AppProSchemaValueType<'text'>;
      /**
       * 时间格式化
       */
      dateFormat?: string;
      /**
       * 进行数据转换
       */
      transform?: AppSearchTransformKeyFn;
    },
  ) => void;
  /**
   * 表单组件类型
   */
  formComponentType?: string;
  /**
   * 获取表单实例计数器
   */
  formKey?: string;
  getPopupContainer?: (e: HTMLElement) => PannerNode;
} & Pick<CommonFormProps, any>;

const AppFielidContext = createContext<AppFieldContextProps>({});

export type { AppFieldContextProps };
export { AppFielidContext };
