import { SpinProps } from 'antd/es/spin';
import { ReactNode } from 'react';

export interface IAppSpinProps extends SpinProps {
  // spin包裹的组件，提供一个占位的效果
  spinComponent?: ReactNode;
}
