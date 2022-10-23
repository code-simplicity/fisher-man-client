import React from 'react';
import Layout from '@/layouts';

export function rootContainer(container: any) {
  return React.createElement(Layout, null, container);
}
