import { ComponentsProps } from '@/pages/Login/interface';
import React, { FC, useCallback, useState } from 'react';
import { injectIntl } from '@@/plugin-locale';
import { SettingOne, Tool } from '@icon-park/react';
import './index.less';
import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Form,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import AppSketchPicker from '@/components/AppSketchPicker';
import AppTriggerLocales from '@/components/AppTriggerLocales';
import AppText from '@/components/AppText';

interface AppSettingProps extends ComponentsProps {}

// TODO:明天继续完善设置组件的编写，加入拖拽的组件，这里需要开发一个拖拽的组件，后面再继续的去实践

const { Item } = Form;
const { Title } = Typography;

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
        width={360}
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
        <Form colon={false}>
          <Divider orientation="left">
            <Tag icon={<Tool theme="outline" size="18" />} color="processing">
              <AppText text={intl.formatMessage({ id: 'systemSetting' })} />
            </Tag>
          </Divider>
          <Item label={intl.formatMessage({ id: 'systemTheme' })}>
            <div className="flex-end">
              <AppSketchPicker />
            </div>
          </Item>
          <Item label={intl.formatMessage({ id: 'systemLanguage' })}>
            <div className="flex-end">
              <AppTriggerLocales />
            </div>
          </Item>
        </Form>
      </Drawer>
    </>
  );
};

export default injectIntl(AppSetting);
