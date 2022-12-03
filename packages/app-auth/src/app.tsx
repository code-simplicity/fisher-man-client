import React from 'react';
import Layout from '@/layouts';
import 'antd/dist/antd.variable.min.css';
import '@icon-park/react/styles/index.less';

export function rootContainer(container: any) {
  // 监听到路由的变化
  console.log('获取路径');
  return React.createElement(Layout, null, container);
}
