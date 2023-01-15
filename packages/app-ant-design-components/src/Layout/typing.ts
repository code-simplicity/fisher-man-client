/**
 * ts 类型体操 深度挑选
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type AppBaseLayoutDesignToken = {
  hashId: string;
  /**
   * 主题色
   */
  colorPrimary: string;
  /**
   * icon hover 的颜色
   */
  colorBgAppListIconHover: string;
  /**
   * icon hover 的文字颜色
   */
  colorTextAppListIconHover: string;
  /**
   * 跨站点应用图标 hover 的颜色
   */
  colorTextAppListIcon: string;
  /**
   * layout 背景色
   */
  bgLayout: string;
  /**
   * 侧边栏配置
   */
  sider: {
    /**
     * 收缩按钮的背景颜色
     */
    colorBgCollapsedButton: string;
  };
  /**
   * header 的 token 设置
   */
  header: {
    /**
     * header 背景色
     */
    colorBgHeader: string;
  };
  /**
   * pageContainer token 设置
   */
  pagerContainer: {
    /**
     * 页面容器背景样式
     */
    colorBgPageContainer: string;
  };
};

export type AppLayoutDesignToken = AppBaseLayoutDesignToken;

/**
 * 获取 layout 布局
 * @param baseDesignTokens 基础的布局
 * @param antdToken antd的样式令牌
 */
export const getLayoutDesignToken: (
  baseDesignTokens: DeepPartial<AppLayoutDesignToken>,
  antdToken: Record<string, any>,
) => AppLayoutDesignToken = (designTokens, antdToken) => {
  const finalDesignTokens = { ...designTokens };
  return {
    bgLayout: `linear-gradient(${antdToken?.colorBgPageContainer}, ${antdToken?.colorBgLayout} 28%)`,
    ...finalDesignTokens,
    header: {},
    sider: {},
    pagerContainer: {},
  } as AppLayoutDesignToken as AppLayoutDesignToken;
};

/**
 * 令牌类型
 */
export type AppProTokenType = {
  layout?: DeepPartial<AppLayoutDesignToken>;
};
