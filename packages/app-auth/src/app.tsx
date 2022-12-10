import React from 'react';
import Layout from '@/layouts';
import '@icon-park/react/styles/index.less';
import { appRequestConfig } from '@/utils';

export function rootContainer(container: any) {
  // 监听到路由的变化
  console.log('获取路径');
  return React.createElement(Layout, null, container);
}

/**
 * 配置request请求
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 */
export const request = {
  ...appRequestConfig,
};
