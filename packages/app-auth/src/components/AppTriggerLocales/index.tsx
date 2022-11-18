import { FC, useState } from 'react';
import { injectIntl, setLocale } from '@@/plugin-locale';
import { ComponentsProps } from '@/pages/Login/interface';
import { Dropdown, Menu, Space } from 'antd';
import { getLocale } from 'umi';
import './index.less';
import { Down } from '@icon-park/react';

interface AppTriggerLocalesProps extends ComponentsProps {}

const prefixCls = 'app-trigger-locales-container';

// 切换多语言组件
const AppTriggerLocales: FC<AppTriggerLocalesProps> = ({ intl }) => {
  const [languageState, setLanguageState] = useState(
    getLocale() || intl.formatMessage({ id: 'zh-CN' }),
  );

  // 选择多语言
  const handleChangeLanguage = (key: string) => {
    // 设置当前的多语言
    setLocale(key);
    setLanguageState(intl.formatMessage({ id: `${key}` }));
  };

  // 多语言菜单
  const localesMenu = (
    <Menu
      onClick={({ key }) => handleChangeLanguage(key)}
      defaultSelectedKeys={[languageState]}
      items={[
        { key: 'zh-CN', label: intl.formatMessage({ id: 'zh-CN' }) },
        { key: 'en-US', label: intl.formatMessage({ id: 'en-US' }) },
      ]}
    ></Menu>
  );
  return (
    <>
      <Dropdown overlay={localesMenu}>
        <Space className={`${prefixCls}`}>
          {languageState}
          <Down className={`${prefixCls}-down`} theme="outline" size="24" />
        </Space>
      </Dropdown>
    </>
  );
};

export default injectIntl(AppTriggerLocales);
