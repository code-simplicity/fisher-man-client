import { ConfigProvider as AntdConfigProvider } from 'antd';
import React, { ReactNode, useContext, type FC } from 'react';

import zh_CN from 'antd/es/locale/zh_CN';

export interface AppProConfigProviderProps {
  /**
   * 内容
   */
  children: ReactNode;
  /**
   * 需要深度监听
   */
  needDeps?: boolean;
  /**
   * 暗黑主题
   */
  dark?: boolean;
}

/**
 * 组件库配置的提供数据
 * @constructor
 */
const AppProConfigProvider: FC<AppProConfigProviderProps> = (props) => {
  const { children, dark, needDeps } = props;
  const { locale, theme, ...otherProps } = useContext(
    AntdConfigProvider.ConfigContext,
  );
  // 判断是否需要渲染Provider
  const isNullProvider =
    needDeps && Object.keys(props).sort().join('-') === 'children-needDeps';
  if (isNullProvider) {
    return <>{children}</>;
  }
  // 合并antd5.x的主题算法
  const mergeAlgorithm = () => {
    const isDark = dark ?? '';
    if (isDark && !Array.isArray(theme?.algorithm)) {
      return [theme?.algorithm].filter(Boolean);
    }
    if (isDark && Array.isArray(theme?.algorithm)) {
      return [...(theme?.algorithm || [])].filter(Boolean);
    }
    return theme?.algorithm;
  };
  // antd的config
  const configProvider = {
    ...otherProps,
    locale: locale || zh_CN,
    theme: {
      ...theme,
      algorithm: mergeAlgorithm(),
    } as typeof theme,
  };
  return (
    <AntdConfigProvider {...configProvider}>{children}</AntdConfigProvider>
  );
};

export { AppProConfigProvider };
