import { IAppSettingProps } from './app-setting';

// 声明类型提供给外部使用
declare const IAppSetting: React.ForwardRefExoticComponent<
  IAppSettingProps & React.RefAttributes<HTMLElement>
>;

export default IAppSetting;
