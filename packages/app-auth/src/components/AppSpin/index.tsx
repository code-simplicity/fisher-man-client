import React, { FC, ReactNode } from 'react';
import { injectIntl } from '@@/plugin-locale';
import { ComponentsProps } from '../../type';
import { ConfigProvider, Spin } from 'antd';
import { useModel } from '@umijs/max';

export interface AppSpin extends ComponentsProps {
  spinTip?: ReactNode; // 自定义提示
  spinDelay?: number; // 加载时间
  spinIndicator?: ReactNode; // 加载指示器
  spinSpinning?: boolean; // 是否为加载中状态
  spinSpinSize?: string; // 组件大小
  wrapperClassName?: string; // 包装器的类属性
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const AppSpin: FC<AppSpin> = (props) => {
  const { appSettingConfigData } = useModel('appSettingModel');
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: appSettingConfigData.colorPrimary } }}
    >
      <Spin {...props} />
    </ConfigProvider>
  );
};

export default injectIntl(AppSpin);
