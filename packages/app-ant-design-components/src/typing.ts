import type { ButtonProps, SpaceProps } from 'antd';
import type { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import { ReactNode, Ref, type CSSProperties } from 'react';
import { AppProFormGridConfig } from './AppBaseForm';

/**
 * 字段的props
 */
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
 * 分组的props
 */
export type GroupProps = {
  /**
   * 分组标题
   */
  title?: ReactNode;
  /**
   * 分组标签
   */
  label?: ReactNode;
  /**
   * 自定义提示信息
   * 可以嵌套任意组件进行展示
   */
  toolTip?: LabelTooltipType | string;
  /**
   * 额外的配置，用于配置标题另外一边的内容
   */
  extra?: ReactNode;
  /**
   * 组件之间的间隔
   */
  size?: SpaceProps['size'];
  /**
   * 组件的内联样式
   */
  style?: CSSProperties;
  /**
   * 标题的内联样式
   */
  titleStyle?: CSSProperties;
  /**
   * 自定义标题render
   * @param title 标题
   * @param props props
   */
  titleRender?: (title: ReactNode, props: GroupProps) => ReactNode;
  /**
   * 对其方式
   * 参数 'start' | 'end' | 'center' | 'baseline';
   */
  align?: SpaceProps['align'];
  /**
   * 子项目排列方式
   * 'horizontal' | 'vertical';
   */
  direction?: SpaceProps['direction'];
  /**
   * 标签和项目的对其方式
   * 单行、两行
   */
  labelLayout?: 'inline' | 'twoLine';
  /**
   * 是否折叠
   */
  collapsed?: boolean;
  /**
   * 是否可折叠
   */
  collapsible?: boolean;
  /**
   * 默认折叠状态
   */
  defaultCollapsed?: boolean;
  /**
   * 自定义选择一个input进行聚焦
   */
  autoFocus?: boolean;
  children?: ReactNode;
  /**
   * 折叠状态的修改
   * @param collapsed 折叠状态
   */
  onCollapse?: (collapsed: boolean) => void;
} & AppProFormGridConfig;

/**
 * 提交的props
 */
export interface SubmitterProps<T = Record<string, any>> {
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
  submitButtonProps?: false | (ButtonProps & { preventDefault?: boolean });
  /**
   * 重置按钮的props
   */
  resetButtonProps?: false | (ButtonProps & { preventDefault?: boolean });
  /**
   * 自定义渲染按钮组合
   */
  render?:
    | ((
        props: SubmitterProps &
          T & {
            onSubmit?: () => void;
            onReset?: () => void;
          },
        dom: JSX.Element[],
      ) => ReactNode[] | ReactNode | false)
    | false;
}
