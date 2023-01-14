import { ReactNode } from 'react';
import { SubmitterProps } from '../typing';

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

export interface AppSubmitterProps<T = Record<string, any>>
  extends SubmitterProps<T> {
  searchConfig?: SearchConfig;
}
