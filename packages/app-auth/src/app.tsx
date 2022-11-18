import React from 'react';
import Layout from '@/layouts';
import 'antd/dist/antd.variable.min.css';
import '@icon-park/react/styles/index.less';

export function rootContainer(container: any) {
  return React.createElement(Layout, null, container);
}
