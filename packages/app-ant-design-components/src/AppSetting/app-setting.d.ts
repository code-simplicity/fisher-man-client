import { DrawerProps } from 'antd';
import { FloatButtonProps } from 'antd/es/float-button/interface';
import { CSSProperties, ReactNode } from 'react';

export interface IFloatButtonChildrenListProps extends FloatButtonProps {
  // 浮动按钮的key
  key: string;
  // 按钮的回调事件
  onChange: ({ ...args }) => void;
}

// 设置的类型
export interface IAppSettingProps extends DrawerProps {
  children?: ReactNode;
  // 设置框的提示标题 (多语言由自己维护传递进来)
  toolTipTitle?: string;
  // 成功按钮文字
  drawerOkText?: string;
  // 取消按钮的文字
  drawerCloseText?: string;
  // 主题色
  colorPrimary?: string;
  // app显示的按钮图标的内联样式
  appSettingStyle?: CSSProperties;
  // 表单提交的按钮loading
  loading?: boolean;
  // 关闭弹窗的方法
  onCloseDrawer?: (e: MouseEvent | KeyboardEvent) => void;
  onOpenDrawer?: (e) => void;
  // 提交数据
  onSubmit: (data: any) => void;
  // 设置按钮组合
  floatButtonChildrenList?: IFloatButtonChildrenListProps[];
}
