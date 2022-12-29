import { AllApplication } from '@icon-park/react';
import { Tooltip } from 'antd';
import { AppSvgIcon } from 'app-ant-design-components';
import React from 'react';

/**
 * 自定义的svg包裹组件
 * @constructor
 */
export default () => {
  return (
    <>
      <Tooltip title="全部">
        <AppSvgIcon svgIconStyle={{ color: '#e82b2b' }}>
          {<AllApplication theme="outline" size="18" />}
        </AppSvgIcon>
      </Tooltip>
    </>
  );
};
