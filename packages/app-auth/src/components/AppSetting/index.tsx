import { ComponentsProps } from '../../type';
import React, { FC, useState } from 'react';
import { injectIntl } from '@@/plugin-locale';
import { SettingOne, Tool } from '@icon-park/react';
import './index.less';
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Drawer,
  Form,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
  FloatButton,
} from 'antd';
import type { FormInstance } from 'antd';
import AppSketchPicker from '../AppSketchPicker';
import AppTriggerLocales from '../AppTriggerLocales';
import AppText from '../AppText';
import { SketchPicker } from 'react-color';
import { useModel } from '@umijs/max';
import { IAppSettingConfigData } from '../../type';

interface AppSettingProps extends ComponentsProps {
  appSettingForm?: FormInstance; // 表单配置
  appSettingConfigData?: IAppSettingConfigData; // 配置数据
  onAppSettingConfigData?: React.Dispatch<
    React.SetStateAction<IAppSettingConfigData>
  >; // 配置数据的方法
  onHandleAppSettingConfig?: (
    changedValues: { colorPrimary: any },
    allValues: any,
  ) => void;
}

// TODO:明天继续完善设置组件的编写，加入拖拽的组件，这里需要开发一个拖拽的组件，后面再继续的去实践

const { Item } = Form;
const { Title } = Typography;

const defaultAppSettingConfig = {
  colorPrimary: '#1677ff',
};

// 设置组件
const AppSetting: FC<AppSettingProps> = (props) => {
  const {
    intl,
    appSettingForm,
    appSettingConfigData = { colorPrimary: '#1677ff' },
    onAppSettingConfigData,
    onHandleAppSettingConfig,
  } = props;
  const [openDrawer, setOpenDrawer] = useState(false);

  // 打开模态框进行设置
  const handleOpenSetting = () => {
    setOpenDrawer(!openDrawer);
  };

  // 关闭抽屉
  const handleClose = () => {
    setOpenDrawer(false);
  };

  /**
   * 配置appConfig
   * @param changedValues
   * @param allValues
   */
  const handleAppSetting = (
    changedValues: { colorPrimary: any },
    allValues: any,
  ) => {
    onHandleAppSettingConfig(changedValues, allValues);
  };

  // 控制颜色
  const handleChangeColor = (colorPrimary: string) => {
    onAppSettingConfigData({
      ...appSettingConfigData,
      colorPrimary,
    });
  };

  // 控制配置
  const handleConfigAppSetting = () => {
    // 发送配置请求
  };

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: appSettingConfigData?.colorPrimary } }}
    >
      <div className="app-setting-container" onClick={handleOpenSetting}>
        <Tooltip title={intl.formatMessage({ id: 'appSetting' })}>
          <Button
            icon={<SettingOne theme="outline" size="24" />}
            type="primary"
          ></Button>
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
            <Button type="primary" onClick={handleConfigAppSetting}>
              {intl.formatMessage({ id: 'ok' })}
            </Button>
          </Space>
        }
      >
        <Form
          colon={false}
          form={appSettingForm}
          name="appSetting"
          initialValues={defaultAppSettingConfig}
          onValuesChange={handleAppSetting}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Divider orientation="left">
            <Tag icon={<Tool theme="outline" size="18" />} color="processing">
              <AppText text={intl.formatMessage({ id: 'systemSetting' })} />
            </Tag>
          </Divider>
          <Item label={intl.formatMessage({ id: 'systemTheme' })}>
            <Item valuePropName="color" name="themeColor" noStyle>
              <div className="flex-end">
                <AppSketchPicker
                  colorPrimary={appSettingConfigData?.colorPrimary}
                  onChangeColor={handleChangeColor}
                />
              </div>
            </Item>
          </Item>
          <Item
            name="language"
            label={intl.formatMessage({ id: 'systemLanguage' })}
          >
            <div className="flex-end">
              <AppTriggerLocales />
            </div>
          </Item>
          {/*<Item className="flex-end">*/}
          {/*  <Space>*/}
          {/*    <Button onClick={handleClose}>*/}
          {/*      {intl.formatMessage({ id: 'cancel' })}*/}
          {/*    </Button>*/}
          {/*    <Button type="primary" onClick={handleClose}>*/}
          {/*      {intl.formatMessage({ id: 'ok' })}*/}
          {/*    </Button>*/}
          {/*  </Space>*/}
          {/*</Item>*/}
        </Form>
      </Drawer>
    </ConfigProvider>
  );
};

export default injectIntl(AppSetting);
