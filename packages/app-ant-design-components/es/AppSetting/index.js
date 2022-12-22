import "antd/es/drawer/style";
import _Drawer from "antd/es/drawer";
import "antd/es/space/style";
import _Space from "antd/es/space";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";
import "antd/es/float-button/style";
import _FloatButton from "antd/es/float-button";
var _excluded = ["toolTipTitle", "appSettingStyle", "children", "drawerOkText", "drawerCloseText", "colorPrimary", "onSubmit"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { CloseOne, SettingOne, System } from '@icon-park/react';
import React, { useState } from 'react';
import AppSvgIcon from "../AppSvgIcon/index";

// TODO：明天继续完善这个组件，包括类型设计这些都和antd这边做一个统一

/**
 * 系统级别的组件
 * @constructor
 */
var AppSetting = function AppSetting(props) {
  var toolTipTitle = props.toolTipTitle,
      appSettingStyle = props.appSettingStyle,
      children = props.children,
      drawerOkText = props.drawerOkText,
      drawerCloseText = props.drawerCloseText,
      colorPrimary = props.colorPrimary,
      onSubmit = props.onSubmit,
      otherProps = _objectWithoutProperties(props, _excluded); // 弹窗的配置


  var _useState = useState({
    open: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      drawerState = _useState2[0],
      setDrawerState = _useState2[1];

  var onOpenDrawer = function onOpenDrawer() {
    setDrawerState({
      open: true
    });
  }; // 取消


  var onCloseDrawer = function onCloseDrawer() {
    setDrawerState({
      open: false
    });
  }; // 确认，发送请求的回调


  var onSubmitSetting = function onSubmitSetting() {
    onSubmit('1');
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_FloatButton.Group, {
    trigger: "click",
    type: "primary",
    style: {
      right: 24
    },
    icon: /*#__PURE__*/React.createElement(SettingOne, {
      theme: "outline",
      size: "20"
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: appSettingStyle,
    onClick: onOpenDrawer
  }, /*#__PURE__*/React.createElement(_Tooltip, {
    title: toolTipTitle
  }, /*#__PURE__*/React.createElement(_FloatButton, {
    icon: /*#__PURE__*/React.createElement(System, {
      theme: "outline",
      size: "18"
    }),
    type: "primary"
  })))), /*#__PURE__*/React.createElement(_Drawer, _extends({
    closeIcon: /*#__PURE__*/React.createElement(AppSvgIcon, {
      svgIconStyle: _objectSpread(_objectSpread({}, appSettingStyle), {}, {
        color: colorPrimary
      })
    }, /*#__PURE__*/React.createElement(CloseOne, {
      theme: "outline",
      size: "22"
    })),
    open: drawerState.open,
    mask: true,
    maskClosable: false,
    onClose: onCloseDrawer,
    extra: /*#__PURE__*/React.createElement(_Space, null, /*#__PURE__*/React.createElement(_Button, {
      onClick: onCloseDrawer
    }, drawerCloseText), /*#__PURE__*/React.createElement(_Button, {
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
export default AppSetting;