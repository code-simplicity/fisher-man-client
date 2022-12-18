import { injectIntl } from '@@/plugin-locale';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { FC, useRef } from 'react';
import { ComponentsProps } from '@/pages/Login/interface';
import OtherLoginMode from '../OtherLoginMode';
import { useModel } from 'umi';
import { LoginEnum } from '@/utils';
import './index.less';
import { FingerprintThree, Key, People } from '@icon-park/react';
import AppCaptcha, { IAppCaptchaRef } from '@/components/AppCaptcha';
import AppSvgIcon from '@/components/AppSvgIcon';

const { Item } = Form;

type LoginFormProps = ComponentsProps;

// 登陆表单
const LoginForm: FC<LoginFormProps> = ({ intl }) => {
  const { handleCheckForm, handleLoginModel } = useModel('loginModel');
  const { appSettingConfigData, onFormValidateRule } =
    useModel('appSettingModel');
  // 登录的表单
  const [loginForm] = Form.useForm<SERVICE.LoginType>();
  // 获取验证码子组件的ref
  const appCaptchaRef = useRef<IAppCaptchaRef | any>();

  /**
   * 登陆
   * @param data
   */
  const handleLogin = (data: SERVICE.LoginType) => {
    handleLoginModel.runAsync(data).then(() => {
      // 验证码更新
      appCaptchaRef?.current?.onRefreshCaptcha();
      // 登录成功之后清除控制台
      loginForm.resetFields(['username', 'password', 'captcha']);
    });
  };

  return (
    <>
      <h2 className="text-xl">
        {intl.formatMessage({ id: 'loginWithAccountPassword' })}
      </h2>
      <Form
        labelAlign="left"
        name="loginForm"
        form={loginForm}
        colon={appSettingConfigData.formColon}
        {...appSettingConfigData.formItemLayout}
        onFinish={handleLogin}
        autoComplete="off"
        initialValues={{
          username: 'admin',
          password: '123456',
          captcha: '123456',
        }}
      >
        <Item
          name="username"
          rules={onFormValidateRule({
            message: intl.formatMessage({ id: 'placeholderUsername' }),
          })}
        >
          <Input
            bordered={appSettingConfigData.border}
            prefix={
              <AppSvgIcon>
                <People theme="outline" size="18" strokeLinecap="square" />
              </AppSvgIcon>
            }
            allowClear
            placeholder={intl.formatMessage({ id: 'placeholderUsername' })}
          />
        </Item>
        <Item
          name="password"
          rules={onFormValidateRule({
            message: intl.formatMessage({ id: 'placeholderUsername' }),
          })}
        >
          <Input.Password
            bordered={appSettingConfigData.border}
            prefix={
              <AppSvgIcon>
                <Key theme="outline" size="18" />
              </AppSvgIcon>
            }
            allowClear
            placeholder={intl.formatMessage({ id: 'placeholderPassword' })}
          />
        </Item>
        <Item>
          <Row gutter={12}>
            <Col span={15}>
              <Item
                name="captcha"
                rules={onFormValidateRule({
                  message: intl.formatMessage({ id: 'placeholderVerifyCode' }),
                })}
                noStyle
              >
                <Input
                  bordered={appSettingConfigData.border}
                  prefix={
                    <AppSvgIcon>
                      <FingerprintThree theme="outline" size="18" />
                    </AppSvgIcon>
                  }
                  allowClear
                  placeholder={intl.formatMessage({
                    id: 'placeholderVerifyCode',
                  })}
                />
              </Item>
            </Col>
            <Col span={9}>
              <AppCaptcha ref={appCaptchaRef} />
            </Col>
          </Row>
        </Item>
        <Item>
          <Button
            block
            type="primary"
            loading={handleLoginModel.loading}
            htmlType="submit"
          >
            {intl.formatMessage({ id: 'login' })}
          </Button>
        </Item>
        <Item>
          <div className="flex items-center justify-between">
            <Button
              type="link"
              onClick={() => handleCheckForm(LoginEnum.forgetPassword)}
            >
              {intl.formatMessage({ id: 'forgetPassword' })}
            </Button>
            <div className={`register-btn`}>
              <Button
                type="text"
                danger
                onClick={() => handleCheckForm(LoginEnum.register)}
              >
                {intl.formatMessage({ id: 'register' })}
              </Button>
            </div>
          </div>
        </Item>
        <Item>
          <OtherLoginMode />
        </Item>
      </Form>
    </>
  );
};

export default injectIntl(LoginForm);
