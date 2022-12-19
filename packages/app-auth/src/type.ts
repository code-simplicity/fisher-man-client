import { IntlShape } from 'react-intl';
import { ReactNode } from 'react';

// 组件的props
export interface ComponentsProps {
  intl: IntlShape;
  children?: ReactNode;
}

export type ILabelCol = {
  xs?: {
    span?: number;
  };
  sm?: {
    span?: number;
  };
};

export type IFormItemLayout = {
  labelCol: ILabelCol;
  wrapperCol: ILabelCol;
};

// 配置config的接口
export interface IAppSettingConfigData {
  colorPrimary?: string; // 主题颜色
  border?: boolean; // 边框
  formItemLayout?: IFormItemLayout; // 表单样式配置
  formColon?: boolean; // 控制标签是否出现冒号
}
