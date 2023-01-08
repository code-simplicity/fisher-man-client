import type { FormProps } from 'antd';
import React, { FC, ReactNode } from 'react';
import AppBaseForm from '../../AppBaseForm';
import { ICommonFormProps } from '../../typing';

export type AppProFormProps<T = Record<string, any>> = Omit<
  FormProps<T>,
  'onFinish'
> &
  ICommonFormProps<T> & {
    children?: ReactNode[] | ReactNode;
  };

/**
 * 基础的超级表单
 * @param props
 * @constructor
 */
const AppProForm: FC<AppProFormProps> = (props) => {
  return <AppBaseForm />;
};

export default AppProForm;
