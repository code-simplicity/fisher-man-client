import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { ConfigProvider as AntdConfigProvider, theme as antdTheme } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';
import { ReactElement, useContext } from 'react';
import { AppProProvider } from '../../context';
import { AppProTokenType } from '../../Layout';
import * as batToken from './token';

/**
 * 设置透明度
 * @param baseColor 需要设置的颜色
 * @param alpha 透明度 0~1
 * rgba string
 */
export const setAlpha = (baseColor: string, alpha: number) => {
  return new TinyColor(baseColor).setAlpha(alpha).toRgbString();
};

/**
 * 颜色修改亮度
 * @param baseColor 需要设置的颜色
 * @param brightness 亮度 {0~100}
 * hexColor string
 */
export const lighten = (baseColor: string, brightness: number) => {
  return new TinyColor(baseColor).lighten(brightness).toHexString();
};

/**
 * 生成样式
 */
export type GenerateStyle<
  ComponentToken extends object = GlobalToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken) => ReturnType;

/**
 * 获取颜色
 */
const genTheme = (): typeof antdTheme => {
  if (typeof antdTheme === 'undefined' || !antdTheme) return batToken as any;
  return antdTheme;
};

/**
 * 主题色
 */
export const appProTheme = genTheme();

/**
 * useToken hooks
 */
export const useToken = appProTheme.useToken;

/**
 * hooks 返回的 style
 */
export type AppUseStyleResult = {
  wrapSRR: (node: ReactElement) => ReactElement;
  hashId: string;
};

/**
 * 主题别名
 */
export type AppProAliasToken = GlobalToken &
  AppProTokenType & {
    /**
     * 主题id
     */
    themeId: number;
    /**
     * pro 的 className
     * .ant-app-pro
     */
    proComponentsCls: string;
    /**
     * antd的className
     * .ant
     */
    antCls: string;
  };

/**
 * 重置组件样式
 * @param token 主题令牌
 */
export const resetComponent = (token: AppProAliasToken): CSSObject => {
  return {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    color: token.colorText,
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    listStyle: 'none', // 去调 ul li的默认样式
  };
};

/**
 * 运行的单位
 * @param token
 */
export const operationUnit = (token: AppProAliasToken): CSSObject => {
  return {
    /**
     * 颜色
     */
    color: token.colorLink,
    /**
     * 下划线
     */
    outline: 'none',
    /**
     * 获取焦点
     */
    cursor: 'pointer',
    /**
     * 动画
     */
    transition: `color ${token.motionDurationSlow}`,
    /**
     * 聚焦
     */
    '&:focus, &:hover': {
      color: token.colorLinkHover,
    },
    /**
     * 激活
     */
    '&:active': {
      color: token.colorLinkActive,
    },
  };
};

/**
 * 封装 antd 的 useStyle，支持antd4.x
 * @param componentName 组件名称
 * @param styleFn 样式函数
 * return AppUseStyleResult
 */
export const useStyle = (
  componentName: string,
  styleFn: (token: AppProAliasToken) => CSSInterpolation,
): AppUseStyleResult => {
  const {
    token = {} as AppProAliasToken,
    hashId = '',
    theme,
  } = useContext(AppProProvider);
  const { getPrefixCls } = useContext(AntdConfigProvider.ConfigContext);
  // @ts-ignore
  token.antCls = `.${getPrefixCls()}`;
  return {
    wrapSRR: useStyleRegister(
      {
        theme: theme!,
        token,
        hashId,
        path: [componentName],
      },
      () => styleFn(token as AppProAliasToken),
    ),
    hashId,
  };
};
