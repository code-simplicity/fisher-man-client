import React, { FC, useState } from 'react';
import { Form, Image, Select, Carousel, Tabs, Card } from 'antd';
import { useIntl, getLocale, useModel } from 'umi';
import { setLocale } from '@@/plugin-locale';
import './index.less';

import LoginForm from '@/pages/Login/components/LoginForm';
import SweepQRCode from '@/pages/Login/components/SweepQRCode';

const prefixCls = 'login-container';
const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;

// 登陆模块
const Login: FC = (props) => {
  const intl = useIntl();
  // 语言
  const [defaultLanguage, setDefaultLanguage] = useState(
    getLocale() || intl.formatMessage({ id: 'zh-CN' }),
  );
  const { language } = useModel('loginModel');

  const [headerTitle, setHeaderTitle] = useState(
    intl.formatMessage({ id: 'fisher_man_app' }),
  );

  // 选择多语言
  const handleChangeLanguage = (value: string) => {
    // 设置当前的多语言
    setLocale(value);
  };

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-wrapper`}>
        <div className="absolute top-6 right-6">
          <Select
            defaultValue={defaultLanguage}
            bordered={false}
            popupClassName="w-12"
            onChange={handleChangeLanguage}
          >
            <Option value="zh-CN">{intl.formatMessage({ id: 'zh_CH' })}</Option>
            <Option value="en-US">{intl.formatMessage({ id: 'en_US' })}</Option>
          </Select>
        </div>
        <div className="w-full h-full">
          <Image
            preview={false}
            // src="https://images.unsplash.com/photo-1666369905573-d9c26caaaff1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            rootClassName={`${prefixCls}-wrapper-image`}
            alt=""
          />
          <span className="text-2xl">title</span>
        </div>
        <div className="w-96 absolute top-16 right-32">
          <Card
            className="w-full h-full"
            title={
              <>
                <span className="text-2xl flex items-center justify-center">
                  {headerTitle}
                </span>
              </>
            }
          >
            <Tabs>
              <TabPane
                tab={intl.formatMessage({ id: 'account_login' })}
                key="account_login"
              >
                <LoginForm />
              </TabPane>
              <TabPane
                tab={intl.formatMessage({ id: 'sweep_QR_code_login' })}
                key="sweep_QR_code_login"
              >
                <SweepQRCode />
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
