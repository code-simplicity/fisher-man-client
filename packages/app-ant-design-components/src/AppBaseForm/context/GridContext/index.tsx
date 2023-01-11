import { createContext } from 'react';
import { AppProFormGridConfig } from '../../typing';

/**
 * 栅格布局的上下文
 */
export const GridContext = createContext<AppProFormGridConfig>({
  grid: false,
  rowProps: undefined,
  colProps: undefined,
});
