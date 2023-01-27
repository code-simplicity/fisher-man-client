import { Theme } from '@ant-design/cssinjs';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import React, {
  createContext,
  FC,
  Key,
  ReactNode,
  RefObject,
  useContext,
} from 'react';
import type { AppProAliasToken } from '../../hooks';
import { defaultToken, emptyTheme } from '../../hooks';
import zhCN from '../../locale/zh_CN';
import { getSafetyObjectValue } from '../../utils';

/**
 * 多语言类型
 */
export interface IntlType {
  /**
   * 多语言
   */
  locale: string;
  /**
   * 获取多语数据函数
   * @param id 标识
   * @param defaultMessage 默认消息
   */
  getMessage: (id: string, defaultMessage: string) => string;
}

/**
 * 值类型
 */
export type AppProSchemaValueEnumType = {
  /**
   * 演示的文案
   */
  text?: ReactNode;
  /**
   * 预定的颜色
   */
  status?: string;
  /**
   * 自定义颜色
   */
  color?: string;
  /**
   * 禁用状态
   */
  disabled?: boolean;
};

/**
 * 值类型，支持Object和 Map
 */
type AppProSchemaValueEnumObj = Record<
  string,
  AppProSchemaValueEnumType | ReactNode
>;
type AppProSchemaValueEnumMap = Map<
  ReactNode,
  AppProSchemaValueEnumType | ReactNode
>;

/**
 * 字段的展示模式
 * 控制展示效果
 */
export type AppProFieldFCMode = 'read' | 'edit' | 'update';

/**
 * 组件值-字段的FC
 */
export type AppBaseProFieldFC = {
  /**
   * 值类型
   */
  text?: ReactNode;
  /**
   * 组件上的props
   */
  fieldProps?: any;
  /**
   * 组件的渲染模式
   *  'read' | 'edit' | 'update';
   */
  mode?: AppProFieldFCMode;
  /**
   * 简约模式
   */
  plain?: boolean;
  /**
   * 轻量模式
   */
  light?: boolean;
  /**
   * 标签
   */
  label?: ReactNode;
  /**
   * 映射值的类型
   */
  valueEnum?: AppProSchemaValueEnumObj | AppProSchemaValueEnumMap;
  /**
   * 唯一的key，用于网络请求
   */
  proFieldKey?: Key;
};

/**
 * render渲染的props
 */
export type AppProFieldFCRenderProps = {
  /**
   * 展示模式
   * 'read' | 'edit' | 'update'
   */
  mode?: AppProFieldFCMode;
  /**
   * 是否只读
   */
  readonly?: boolean;
  /**
   * 占位效果
   */
  placeholder?: string | string[];
  /**
   * 字段的值
   */
  value?: any;
  /**
   * 改变的方法
   * @param rest
   */
  onChange?: (...rest: any[]) => void;
} & AppBaseProFieldFC;

export type AppProRenderFieldPropsType = {
  /**
   * 自定义只读模式的渲染器
   * text 默认的值类型
   * props dom 的props
   * dom 默认的dom节点
   */
  render:
    | ((
        text: any,
        props: Omit<AppProFieldFCRenderProps, 'value' | 'onChange'>,
        dom: JSX.Element,
      ) => JSX.Element)
    | undefined;
  /**
   * 自定义编辑的渲染器
   * text 默认的值类型
   * props dom 的props
   * dom 默认的dom节点
   */
  renderFormItem?:
    | ((
        text: any,
        props: AppProFieldFCRenderProps,
        dom: JSX.Element,
      ) => JSX.Element)
    | undefined;
};

export interface ConfigContextPropsType {
  /**
   * 多语言
   */
  intl?: IntlType;
  /**
   * 参考antd和pro
   */
  token?: AppProAliasToken;
  /**
   * 是否散列
   */
  hashed?: boolean;
  /**
   * id
   */
  hashId?: string;
  /**
   * 暗黑主题
   */
  dark?: boolean;
  /**
   * 主题色
   */
  theme?: Theme<any, any>;
  /**
   * 值类型映射
   */
  valueTypeMap?: Record<string, AppProRenderFieldPropsType>;
  /**
   * dom的ref容器
   */
  containerDomRef?: RefObject<HTMLDivElement>;
}

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
 * 操作国际化的函数
 * @param locale 语言
 * @param localeMap 语言的map对象
 */
const createIntl = (
  locale: string,
  localeMap: Record<string, any>,
): IntlType => {
  return {
    getMessage: (id: string, defaultMessage: string) => {
      return (
        getSafetyObjectValue(localeMap, id, defaultMessage) || defaultMessage
      );
    },
    locale,
  };
};

/**
 * 中文
 */
const zhCNIntl = createIntl('zh_cn', zhCN);

/**
 * 初始化一个对象存储多语言
 */
export const intlLanguageMap = {
  'zh-CN': zhCNIntl,
};

/**
 * 多语言的key
 */
const intlMapKeys = Object.keys(intlLanguageMap);

export type ParamsType = Record<string, any>;

/**
 * 根据antd的key来找到locale插件的key
 * @param localeKey
 */
export const findIntlKeyByAntdLocaleKey = <T extends string | undefined>(
  localeKey: T,
) => {
  if (!localeKey) {
    return 'zh-CN' as T;
  }
  const localeName = localeKey.toLocaleLowerCase();
  return intlMapKeys.find((intlKey) => {
    const lowerCaseKey = intlKey.toLocaleLowerCase();
    return lowerCaseKey.includes(localeName);
  }) as T;
};

const AppProConfigContext = createContext<ConfigContextPropsType>({
  intl: {
    ...zhCNIntl,
    locale: 'default',
  },
  hashed: true,
  dark: false,
  valueTypeMap: {},
  theme: emptyTheme,
  token: defaultToken as AppProAliasToken,
});

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

const AppProProvider = AppProConfigContext;

AppProProvider.displayName = 'AppProProvider';

export { zhCNIntl };
export { AppProProvider, AppProConfigContext, AppProConfigProvider };
