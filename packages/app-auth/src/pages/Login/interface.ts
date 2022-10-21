import { IntlShape } from 'react-intl';
import { ReactNode } from 'react';

// 组件的props
export interface ComponentsProps {
  intl: IntlShape;
  children?: ReactNode;
}
