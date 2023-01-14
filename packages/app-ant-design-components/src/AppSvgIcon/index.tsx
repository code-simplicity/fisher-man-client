import React, { FC } from 'react';
import { AppSvgIconProps } from './typing';

/**
 * svg图标组件
 * @param props
 * @constructor
 */
const AppSvgIcon: FC<AppSvgIconProps> = (props) => {
  const { svgIconStyle, children } = props;
  return <span style={svgIconStyle}>{children}</span>;
};

AppSvgIcon.defaultProps = {
  svgIconStyle: {
    lineHeight: '100%',
  },
};

export default AppSvgIcon;
