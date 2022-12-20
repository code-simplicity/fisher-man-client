import React, { FC, useRef } from 'react';
import { injectIntl } from '@@/plugin-locale';
import { ComponentsProps } from '../../../../type';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { LoginEnum } from '@/utils';
import { useModel } from 'umi';
import {
  AcceptEmail,
  FileCode,
  FingerprintThree,
  Key,
  Keyhole,
} from '@icon-park/react';
import AppCaptcha, { IAppCaptchaRef } from '@/components/AppCaptcha';
import AppEmailCountDown from '@/components/AppEmailCountDown';
import AppSvgIcon from '@/components/AppSvgIcon';

const { Item } = Form;

interface ForgetFormProps extends ComponentsProps {}

// 忘记密码
const ForgetForm: FC<ForgetFormProps> = ({ intl }) => {
  const { handleCheckForm } = useModel('loginModel');
  const { appSettingConfigData, onFormValidateRule } =
    useModel('appSettingModel');
  const { handleForgetPasswordModel } = useModel('forgetModel');
  const [forgetForm] = Form.useForm();
  // 获取验证码子组件的ref
  const appCaptchaRef = useRef<IAppCaptchaRef | any>();

  /**
   * 更新密码
   * @param data
   */
  const handleForget = (data: SERVICE.ForgetPasswordType) => {
    handleForgetPasswordModel.runAsync(data).then(() => {
      appCaptchaRef?.current?.onRefreshCaptcha();
      // 清除输入框
      forgetForm.resetFields([
        'password',
        'confirmPassword',
        'captcha',
        'email',
        'emailCode',
      ]);
    });
  };

  return (
    <>
      <h2 className="text-xl">
        {intl.formatMessage({ id: 'forgetPassword' })}
      </h2>
      <Form
        labelAlign="left"
        name="forgetForm"
        form={forgetForm}
        colon={appSettingConfigData.formColon}
        {...appSettingConfigData.formItemLayout}
        onFinish={handleForget}
        initialValues={{
          email: 'dupyi0912@gmail.com',
          captcha: '123456',
          password: '',
        }}
      >
        <Item
          name="password"
          hasFeedback
          rules={onFormValidateRule({
            message: intl.formatMessage({ id: 'placeholderPassword' }),
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
        <Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'placeholderConfirmPassword',
              }),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({
                        id: 'placeholderErrorConfirmPassword',
                      }),
                    ),
                  );
                }
              },
            }),
          ]}
        >
          <Input.Password
            bordered={appSettingConfigData.border}
            prefix={
              <AppSvgIcon>
                <Keyhole theme="outline" size="18" />
              </AppSvgIcon>
            }
            allowClear
            placeholder={intl.formatMessage({
              id: 'placeholderConfirmPassword',
            })}
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
          <Row gutter={12}>
            <Col span={15}>
              <Item
                name="email"
                rules={onFormValidateRule({
                  message: intl.formatMessage({ id: 'placeholderEmail' }),
                  rule: {
                    pattern:
                      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                    message: intl.formatMessage({ id: 'emailFormatError' }),
                  },
                })}
                noStyle
              >
                <Input
                  bordered={appSettingConfigData.border}
                  prefix={
                    <AppSvgIcon>
                      <AcceptEmail theme="outline" size="18" />
                    </AppSvgIcon>
                  }
                  allowClear
                  placeholder={intl.formatMessage({ id: 'placeholderEmail' })}
                />
              </Item>
            </Col>
            <Col span={9}>
              <AppEmailCountDown modelForm={forgetForm} />
            </Col>
          </Row>
        </Item>
        <Item
          name="emailCode"
          rules={onFormValidateRule({
            message: intl.formatMessage({ id: 'placeholderEmailCode' }),
          })}
        >
          <Input
            bordered={appSettingConfigData.border}
            prefix={
              <AppSvgIcon>
                <FileCode theme="outline" size="18" />
              </AppSvgIcon>
            }
            allowClear
            placeholder={intl.formatMessage({ id: 'placeholderEmailCode' })}
          />
        </Item>
        <Item>
          <Button block htmlType="submit" type="primary">
            {intl.formatMessage({ id: 'updatePassword' })}
          </Button>
        </Item>
        <Item>
          <div className="flex items-center justify-between">
            <Button
              type="link"
              onClick={() => handleCheckForm(LoginEnum.login)}
            >
              {intl.formatMessage({ id: 'login' })}
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
      </Form>
    </>
  );
};

export default injectIntl(ForgetForm);
