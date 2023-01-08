import type { ButtonProps } from 'antd';
import { ReactNode, Ref, type CSSProperties } from 'react';

export interface FieldProps<K> {
  /**
   * 内联样式
   */
  style?: CSSProperties;
  /**
   * 宽度
   */
  width?: string;
  /**
   * 字段属性的ref定义
   */
  ref?: Ref<K>;
}

/**
 * 提交的props
 */
export interface ISubmitterProps<T = Record<string, any>> {
  /**
   * 提交方法
   * @param value
   */
  onSubmit?: (value?: T) => void;
  /**
   * 重置方法
   * @param value
   */
  onReset?: (value?: T) => void;
  /**
   * 提交按钮的props
   */
  submitButtonProps?: (ButtonProps & { preventDefault?: boolean }) | false;
  /**
   * 重置按钮的props
   */
  resetButtonProps?: (ButtonProps & { preventDefault?: boolean }) | false;
  /**
   * 自定义渲染按钮组合
   */
  render?:
    | ((
        props: ISubmitterProps &
          T & {
            onSubmit?: () => void;
            onReset?: () => void;
          },
        dom: JSX.Element[],
      ) => ReactNode[] | ReactNode | false)
    | false;
}
