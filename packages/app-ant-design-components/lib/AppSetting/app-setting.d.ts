import { DrawerProps } from 'antd';
import { CSSProperties, ReactNode } from 'react';

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
  // 关闭弹窗的方法
  onCloseDrawer?: (e: MouseEvent | KeyboardEvent) => void;
  onOpenDrawer?: (e) => void;
  // 提交数据
  onSubmit: (data: any) => void;
}
