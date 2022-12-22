"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * svg图标组件
 * @param props
 * @constructor
 */
const AppSvgIcon = props => {
  const {
    svgIconStyle,
    children
  } = props;
  return /*#__PURE__*/_react.default.createElement("span", {
    style: svgIconStyle
  }, children);
};

AppSvgIcon.defaultProps = {
  svgIconStyle: {
    lineHeight: '100%'
  }
};
var _default = AppSvgIcon;
exports.default = _default;