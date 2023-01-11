import { Theme } from '@ant-design/cssinjs';
import { createContext } from 'react';
import { getSafetyObjectValue } from '../../utils';

/**
 * 多语言类型
 */
interface IntlType {
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

interface IConfigContextPropsType {
  /**
   * 多语言
   */
  intl?: IntlType;
  /**
   * 参考antd和pro
   */
  token?: boolean;
  /**
   * 散列
   */
  hashed?: boolean;
  /**
   * 暗黑主题
   */
  dark?: boolean;
  /**
   * 主题色
   */
  theme?: Theme<any, any>;
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

const AppProConfigContext = createContext<IConfigContextPropsType>({
  intl: {
    locale: 'default',
  },
  hashed: true,
  dark: false,
});

export type { IntlType, IConfigContextPropsType };
export { AppProConfigContext };
