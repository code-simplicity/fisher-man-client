import { SettingOne } from '@icon-park/react';
import type { DrawerProps } from 'antd';
import { Button, Drawer, Tooltip } from 'antd';
import React, { FC, ReactNode } from 'react';

export interface IAppSettingProps {
  // 设置框的提示标题 (多语言由自己维护传递进来)
  toolTipTitle?: string;
  // app显示的按钮图标的内联样式
  appSettingStyle?: any;
  // 侧拉抽屉的title
  drawerTitle?: string | ReactNode;
  // 抽屉的方向
  drawerPlacement?: DrawerProps['placement'];
  // 组件子类
  children?: ReactNode;
}

/**
 * 系统级别的组件
 * @constructor
 */
const AppSetting: FC<IAppSettingProps> = (props) => {
  const {
    toolTipTitle,
    appSettingStyle,
    drawerTitle,
    drawerPlacement,
    children,
  } = props;
  return (
    <>
      <Tooltip title={toolTipTitle}>
        <div className={''} style={appSettingStyle}>
          <Button
            icon={<SettingOne theme="outline" size="24" />}
            type="primary"
          ></Button>
        </div>
      </Tooltip>
      <Drawer
        title={drawerTitle}
        placement={drawerPlacement}
        width="calc(60vw - 400px)"
        open={true}
        mask={true}
        maskClosable={true}
      >
        {children}
      </Drawer>
    </>
  );
};

export default AppSetting;
