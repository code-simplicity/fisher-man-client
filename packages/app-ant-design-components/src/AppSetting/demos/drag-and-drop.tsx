import { ConfigProvider } from 'antd';
import React from 'react';
import AppSetting from '../index';

/**
 * 跟随主题色改变的demo
 * @constructor
 */
export default () => {
  const handleSubmit = (data: any) => {
    console.log('e', data);
  };
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#e82b2b' } }}>
      <AppSetting onSubmit={handleSubmit} colorPrimary="#e82b2b" />
    </ConfigProvider>
  );
};
