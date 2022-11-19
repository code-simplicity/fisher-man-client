import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Form, Image, Select, Tabs, Card, ConfigProvider } from 'antd';
import { useIntl, useModel } from 'umi';
import { LoginEnum } from '@/utils';
import ForgetForm from '@/pages/Login/components/ForgetForm';
import LoginForm from '@/pages/Login/components/LoginForm';
import SweepQRCode from '@/pages/Login/components/SweepQRCode';
import RegisterForm from '@/pages/Login/components/RegisterForm';
import configurationColor from '@/utils/ConfigurationColor';
import AppSketchPicker from '@/components/AppSketchPicker';
import AppSetting from '@/components/AppSetting';
import AppPointBackground from '@/components/AppPointBackground';
import './index.less';
import AppTriggerLocales from '@/components/AppTriggerLocales';

const prefixCls = 'login-container';
const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;

// 登陆模块
const Login: FC = (props) => {
  const intl = useIntl();

  const { cardFormState } = useModel('loginModel');
  const [headerTitle, setHeaderTitle] = useState(
    intl.formatMessage({ id: 'fisherManApp' }),
  );
  const [color, setColor] = useState({
    primaryColor: '#e50878',
  });

  useLayoutEffect(() => {
    onColorChange('#e50878');
  }, []);

  // 获取不同的组件
  const getDifferentComponents = () => {
    if (cardFormState === LoginEnum.login) {
      return (
        <Tabs>
          <TabPane
            tab={intl.formatMessage({ id: 'accountLogin' })}
            key="accountLogin"
          >
            <LoginForm />
          </TabPane>
          <TabPane
            tab={intl.formatMessage({ id: 'sweepQRCodeLogin' })}
            key="sweepQRCodeLogin"
          >
            <SweepQRCode />
          </TabPane>
        </Tabs>
      );
    }
    if (cardFormState === LoginEnum.forgetPassword) {
      return <ForgetForm />;
    }
    if (cardFormState === LoginEnum.register) {
      return <RegisterForm />;
    }
  };

  const onColorChange = (nextColor: string) => {
    const colors = configurationColor(nextColor);
    // 设置颜色
    setColor({ primaryColor: nextColor });
    ConfigProvider.config({
      theme: colors,
    });
  };

  return (
    <div className={`${prefixCls}`}>
      <AppPointBackground x={0} y={0} radius={0} />
      <div className={`${prefixCls}-wrapper`}>
        <div className={`${prefixCls}-wrapper-content`}>
          <div className="app-header-title text-3xl md:hidden sm:hidden">
            <div>{headerTitle}</div>
          </div>
        </div>
        <div
          className={`${prefixCls}-wrapper-form`}
        >
          <div className={`${prefixCls}-wrapper-form`}>
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
      </div>
      <AppSetting />
    </div>
  );
};

export default Login;
