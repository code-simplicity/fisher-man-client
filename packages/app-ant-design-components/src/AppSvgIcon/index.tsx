import React, { FC } from 'react';
import { IAppSvgIconProps } from './app-svg-icon';

/**
 * svg图标组件
 * @param props
 * @constructor
 */
const AppSvgIcon: FC<IAppSvgIconProps> = (props) => {
  const { svgIconStyle, children } = props;
  return <span style={svgIconStyle}>{children}</span>;
};

AppSvgIcon.defaultProps = {
  svgIconStyle: {
    lineHeight: '100%',
  },
};

export default AppSvgIcon;
