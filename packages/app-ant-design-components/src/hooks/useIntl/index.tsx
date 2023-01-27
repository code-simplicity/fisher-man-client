import { ConfigProvider as AntdConfigProvider } from 'antd';
import { useContext } from 'react';
import {
  AppProConfigContext,
  findIntlKeyByAntdLocaleKey,
  intlLanguageMap,
  zhCNIntl,
} from '../../context';

/**
 * 获取多语言的hooks
 */
export function useIntl() {
  const { locale } = useContext(AntdConfigProvider.ConfigContext);
  const { intl } = useContext(AppProConfigContext);

  if (intl && intl.locale !== 'default') {
    return intl || zhCNIntl;
  }

  if (locale?.locale) {
    return (
      intlLanguageMap[findIntlKeyByAntdLocaleKey(locale?.locale)] || zhCNIntl
    );
  }

  return zhCNIntl;
}
