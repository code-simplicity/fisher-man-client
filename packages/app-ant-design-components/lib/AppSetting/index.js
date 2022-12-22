"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/drawer/style");

var _drawer = _interopRequireDefault(require("antd/es/drawer"));

require("antd/es/space/style");

var _space = _interopRequireDefault(require("antd/es/space"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/float-button/style");

var _floatButton = _interopRequireDefault(require("antd/es/float-button"));

var _react = require("@icon-park/react");

var _react2 = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("../AppSvgIcon/index"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// TODO：明天继续完善这个组件，包括类型设计这些都和antd这边做一个统一

/**
 * 系统级别的组件
 * @constructor
 */
const AppSetting = props => {
  const {
    toolTipTitle,
    appSettingStyle,
    children,
    drawerOkText,
    drawerCloseText,
    colorPrimary,
    onSubmit,
    ...otherProps
  } = props; // 弹窗的配置

  const [drawerState, setDrawerState] = (0, _react2.useState)({
    open: false
  });

  const onOpenDrawer = () => {
    setDrawerState({
      open: true
    });
  }; // 取消


  const onCloseDrawer = () => {
    setDrawerState({
      open: false
    });
  }; // 确认，发送请求的回调


  const onSubmitSetting = () => {
    onSubmit('1');
  };

  return /*#__PURE__*/_react2.default.createElement(_react2.default.Fragment, null, /*#__PURE__*/_react2.default.createElement(_floatButton.default.Group, {
    trigger: "click",
    type: "primary",
    style: {
      right: 24
    },
    icon: /*#__PURE__*/_react2.default.createElement(_react.SettingOne, {
      theme: "outline",
      size: "20"
    })
  }, /*#__PURE__*/_react2.default.createElement("div", {
    style: appSettingStyle,
    onClick: onOpenDrawer
  }, /*#__PURE__*/_react2.default.createElement(_tooltip.default, {
    title: toolTipTitle
  }, /*#__PURE__*/_react2.default.createElement(_floatButton.default, {
    icon: /*#__PURE__*/_react2.default.createElement(_react.System, {
      theme: "outline",
      size: "18"
    }),
    type: "primary"
  })))), /*#__PURE__*/_react2.default.createElement(_drawer.default, _extends({
    closeIcon: /*#__PURE__*/_react2.default.createElement(_index.default, {
      svgIconStyle: { ...appSettingStyle,
        color: colorPrimary
      }
    }, /*#__PURE__*/_react2.default.createElement(_react.CloseOne, {
      theme: "outline",
      size: "22"
    })),
    open: drawerState.open,
    mask: true,
    maskClosable: false,
    onClose: onCloseDrawer,
    extra: /*#__PURE__*/_react2.default.createElement(_space.default, null, /*#__PURE__*/_react2.default.createElement(_button.default, {
      onClick: onCloseDrawer
    }, drawerCloseText), /*#__PURE__*/_react2.default.createElement(_button.default, {
      type: "primary",
      onClick: onSubmitSetting
    }, drawerOkText))
  }, otherProps), children));
}; // 设置默认值


AppSetting.defaultProps = {
  drawerCloseText: '关闭',
  drawerOkText: '确认',
  width: 'calc(60vw)',
  toolTipTitle: '摸鱼君-系统设置',
  colorPrimary: '#e82b2b'
};
var _default = AppSetting;
exports.default = _default;