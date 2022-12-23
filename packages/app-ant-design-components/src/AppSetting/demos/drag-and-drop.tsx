import { ConfigProvider, Form } from 'antd';
import React, { useState } from 'react';
import AppSettingForm from '../../AppSettingForm';
import AppSetting from '../index';

/**
 * 跟随主题色改变的demo
 * @constructor
 */
export default () => {
  const [loadingState, setLoadingState] = useState(false);
  const [appSettingForm] = Form.useForm<{ settingTitle: string }>();
  const handleSubmit = (data: any) => {
    console.log('e', data);
    setLoadingState(true);
    console.log(
      'data ==>',
      appSettingForm.getFieldsValue([
        'settingTitle',
        'settingIcon',
        'supportLanguage',
        'themeColor',
        'navigationBarPreferences',
        'sidebarPreferences',
      ]),
    );
  };
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#e82b2b' } }}>
      <AppSetting
        loading={loadingState}
        onSubmit={handleSubmit}
        colorPrimary="#e82b2b"
      >
        <AppSettingForm form={appSettingForm} onFinish={handleSubmit} />
      </AppSetting>
    </ConfigProvider>
  );
};
