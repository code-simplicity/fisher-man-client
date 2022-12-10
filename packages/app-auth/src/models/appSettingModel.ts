import { Form } from 'antd';
import { useState } from 'react';
import { theme } from 'antd';

const { useToken } = theme;

type AppSettingConfigData = {
  colorPrimary: string;
};

const defaultAppSettingConfig = {
  colorPrimary: '#1677ff',
};

export default () => {
  const [appSettingForm] = Form.useForm();
  const { token } = useToken();

  const [appSettingConfigData, setAppSettingConfigData] =
    useState<AppSettingConfigData>(defaultAppSettingConfig);

  /**
   * 配置appConfig
   * @param changedValues
   * @param allValues
   */
  const handleAppSettingConfig = (
    changedValues: { colorPrimary: any },
    allValues: any,
  ) => {
    const colorObj = changedValues?.colorPrimary
      ? { colorPrimary: allValues?.colorPrimary?.hex }
      : {};
    setAppSettingConfigData({ ...allValues, ...colorObj });
  };

  return {
    appSettingForm,
    appSettingConfigData,
    setAppSettingConfigData,
    handleAppSettingConfig,
  };
};
