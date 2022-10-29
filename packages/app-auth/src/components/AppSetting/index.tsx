import { ComponentsProps } from '@/pages/Login/interface';
import { FC, useCallback, useState } from 'react';
import { injectIntl } from '@@/plugin-locale';
import { SettingOne } from '@icon-park/react';
import './index.less';
import { Button, Drawer, Space, Tooltip } from 'antd';

interface AppSettingProps extends ComponentsProps {}

// 设置组件
const AppSetting: FC<AppSettingProps> = ({ intl }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  // 打开模态框进行设置
  const handleOpenSetting = () => {
    setOpenDrawer(!openDrawer);
  };

  // 关闭抽屉
  const handleClose = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      <div className="app-setting-container" onClick={handleOpenSetting}>
        <Tooltip title={intl.formatMessage({ id: 'appSetting' })}>
          <SettingOne theme="outline" size="36" />
        </Tooltip>
      </div>
      <Drawer
        title={intl.formatMessage({ id: 'appSettingTitle' })}
        placement="right"
        width={600}
        onClose={handleClose}
        open={openDrawer}
        mask={true}
        maskClosable={false}
        extra={
          <Space>
            <Button onClick={handleClose}>
              {intl.formatMessage({ id: 'cancel' })}
            </Button>
            <Button type="primary" onClick={handleClose}>
              {intl.formatMessage({ id: 'ok' })}
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default injectIntl(AppSetting);
