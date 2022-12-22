import { ConfigProvider } from 'antd';
import React, { useState } from 'react';
import AppSetting from '../index';

/**
 * 跟随主题色改变的demo
 * @constructor
 */
export default () => {
  const [loadingState, setLoadingState] = useState(false);
  const handleSubmit = (data: any) => {
    console.log('e', data);
    setLoadingState(true);
  };
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#e82b2b' } }}>
      <AppSetting
        loading={loadingState}
        onSubmit={handleSubmit}
        colorPrimary="#e82b2b"
      />
    </ConfigProvider>
  );
};
