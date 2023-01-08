import { ReactNode } from 'react';
import { ISubmitterProps } from '../typing';

/**
 * 搜索配置
 */
export interface SearchConfig {
  /**
   * 提交按钮配置
   */
  submitText?: ReactNode;
  /**
   * 重置按钮配置
   */
  resetText?: ReactNode;
}

export interface IAppSubmitterProps<T = Record<string, any>>
  extends ISubmitterProps<T> {
  searchConfig?: SearchConfig;
}
