import React, { FC, useState } from 'react';
import { Form, Select, Tabs, Card, ConfigProvider } from 'antd';
import { useIntl, useModel } from 'umi';
import { LoginEnum } from '@/utils';
import ForgetForm from '@/pages/Login/components/ForgetForm';
import LoginForm from '@/pages/Login/components/LoginForm';
import SweepQRCode from '@/pages/Login/components/SweepQRCode';
import RegisterForm from '@/pages/Login/components/RegisterForm';
import AppSetting from '@/components/AppSetting';
import AppPointBackground from '@/components/AppPointBackground';
import './index.less';

const prefixCls = 'login-container';
const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;

// 登陆模块
const Login: FC = (props) => {
  const intl = useIntl();
  const { cardFormState } = useModel('loginModel');
  const { appSettingConfigData } = useModel('appSettingModel');
  const [headerTitle, setHeaderTitle] = useState(
    intl.formatMessage({ id: 'fisherManApp' }),
  );

  const tabItems = [
    {
      label: intl.formatMessage({ id: 'accountLogin' }),
      key: 'accountLogin',
      children: <LoginForm />,
    },
    {
      label: intl.formatMessage({ id: 'sweepQRCodeLogin' }),
      key: 'sweepQRCodeLogin',
      children: <SweepQRCode />,
    },
  ];

  // 获取不同的组件
  const getDifferentComponents = () => {
    if (cardFormState === LoginEnum.login) {
      return <Tabs items={tabItems} />;
    }
    if (cardFormState === LoginEnum.forgetPassword) {
      return <ForgetForm />;
    }
    if (cardFormState === LoginEnum.register) {
      return <RegisterForm />;
    }
  };

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: appSettingConfigData.colorPrimary } }}
    >
      <div className={`${prefixCls}`}>
        <AppPointBackground x={0} y={0} radius={0} />
        <div className={`${prefixCls}-wrapper`}>
          <div className={`${prefixCls}-wrapper-content`}>
            <div className="app-header-title text-3xl md:hidden sm:hidden">
              <div>{headerTitle}</div>
            </div>
          </div>
          <div className={`${prefixCls}-wrapper-form md:mr-24`}>
            <Card
              className="login-card-warp"
              title={
                <>
                  <span className="text-2xl flex items-center justify-center">
                    {headerTitle}
                  </span>
                </>
              }
            >
              {getDifferentComponents()}
            </Card>
          </div>
        </div>
        <AppSetting />
      </div>
    </ConfigProvider>
  );
};

export default Login;
