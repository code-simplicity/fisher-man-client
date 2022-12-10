import { Outlet } from 'umi';
import React, { FC, ReactNode, useState } from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import './index.less';

interface LayoutProps {
  children: ReactNode;
}

type AppSettingConfigData = {
  colorPrimary: string;
};

const defaultAppSettingConfig = {
  colorPrimary: '#1677ff',
};

// 样式配置
const Layout: FC<LayoutProps> = (props) => {
  // const [appSettingConfigData, setAppSettingConfigData] =
  //   useState<AppSettingConfigData>(defaultAppSettingConfig);

  return (
    <ConfigProvider>
      <StyleProvider hashPriority="high">
        <div className="layout-container">
          {props.children}
          <Outlet />
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default Layout;
