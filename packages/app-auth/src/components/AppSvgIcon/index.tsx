import React, { FC, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { useModel } from '@umijs/max';

export interface IAppSvgIconProps {
  children?: ReactNode;
}

/**
 * SvgIcon的图标颜色跟随主题色配置
 * @param props
 * @constructor
 */
const AppSvgIcon: FC<IAppSvgIconProps> = (props) => {
  const { children } = props;
  const { appSettingConfigData } = useModel('appSettingModel');
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: appSettingConfigData.colorPrimary } }}
    >
      <span
        style={{ color: appSettingConfigData.colorPrimary, lineHeight: '100%' }}
      >
        {children}
      </span>
    </ConfigProvider>
  );
};

export default AppSvgIcon;
