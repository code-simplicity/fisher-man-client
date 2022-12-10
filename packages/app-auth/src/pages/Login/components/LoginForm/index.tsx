import { injectIntl } from '@@/plugin-locale';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { FC } from 'react';
import { ComponentsProps } from '@/pages/Login/interface';
import OtherLoginMode from '../OtherLoginMode';
import { useModel } from 'umi';
import { LoginEnum } from '@/utils';
import './index.less';
import { FingerprintThree, Key, User } from '@icon-park/react';
import AppCaptcha from '@/components/AppCaptcha';

const { Item } = Form;

type LoginFormProps = ComponentsProps;

// 登陆表单
const LoginForm: FC<LoginFormProps> = ({ intl }) => {
  const { formConfigState, handleCheckForm, validateRule } =
    useModel('loginModel');

  // 登陆
  const handleLogin = (data: any) => {
    console.log('data ==>', data);
  };

  // TODO：登陆逻辑的编写

  return (
    <>
      <h2 className="text-xl">
        {intl.formatMessage({ id: 'loginWithAccountPassword' })}
      </h2>
      <Form
        labelAlign="left"
        colon={false}
        {...formConfigState.formItemLayout}
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Item
          name="username"
          rules={validateRule({
            message: intl.formatMessage({ id: 'placeholderUsername' }),
          })}
        >
          <Input
            bordered={formConfigState.border}
            prefix={<User theme="outline" size="18" />}
            allowClear
            placeholder={intl.formatMessage({ id: 'placeholderUsername' })}
          />
        </Item>
        <Item
          name="password"
          rules={validateRule({
            message: intl.formatMessage({ id: 'placeholderUsername' }),
          })}
        >
          <Input.Password
            bordered={formConfigState.border}
            prefix={<Key theme="outline" size="18" />}
            allowClear
            placeholder={intl.formatMessage({ id: 'placeholderPassword' })}
          />
        </Item>
        <Item
          name="verifyCode"
          rules={validateRule({
            message: intl.formatMessage({ id: 'placeholderVerifyCode' }),
          })}
        >
          <Row gutter={12}>
            <Col span={15}>
              <Input
                bordered={formConfigState.border}
                prefix={<FingerprintThree theme="outline" size="18" />}
                allowClear
                placeholder={intl.formatMessage({
                  id: 'placeholderVerifyCode',
                })}
              />
            </Col>
            <Col span={9}>
              <AppCaptcha />
            </Col>
          </Row>
        </Item>
        <Item>
          <Button block type="primary" htmlType="submit">
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
