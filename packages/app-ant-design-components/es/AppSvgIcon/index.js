import React from 'react';

/**
 * svg图标组件
 * @param props
 * @constructor
 */
var AppSvgIcon = function AppSvgIcon(props) {
  var svgIconStyle = props.svgIconStyle,
      children = props.children;
  return /*#__PURE__*/React.createElement("span", {
    style: svgIconStyle
  }, children);
};

AppSvgIcon.defaultProps = {
  svgIconStyle: {
    lineHeight: '100%'
  }
};
export default AppSvgIcon;