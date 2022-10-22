import { injectIntl } from '@@/plugin-locale';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { FC } from 'react';
import { ComponentsProps } from '@/pages/Login/interface';
import OtherLoginMode from '../OtherLoginMode';
import { useModel } from 'umi';
import { LoginEnum } from '@/utils';
import './index.less';
import { FingerprintThree, Key, User } from '@icon-park/react';

const { Item } = Form;

interface LoginFormProps extends ComponentsProps {}

// 登陆表单
const LoginForm: FC<LoginFormProps> = ({ intl }) => {
  const { loginConfigState, handleCheckForm, validateRule } =
    useModel('loginModel');

  // 登陆
  const handleLogin = (data: any) => {
    console.log('data ==>', data);
  };

  return (
    <>
      <h2 className="text-xl">
        {intl.formatMessage({ id: 'loginWithAccountPassword' })}
      </h2>
      <Form
        labelAlign="left"
        colon={false}
        labelCol={{ span: 4 }}
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Item
          name="username"
          rules={validateRule(
            true,
            intl.formatMessage({ id: 'placeholderUsername' }),
          )}
        >
          <Input
            bordered={loginConfigState.border}
            prefix={<User theme="outline" size="18" />}
            allowClear
            placeholder={intl.formatMessage({ id: 'placeholderUsername' })}
          />
        </Item>
        <Item
          name="password"
          rules={validateRule(
            true,
            intl.formatMessage({ id: 'placeholderUsername' }),
          )}
        >
          <Input.Password
            bordered={loginConfigState.border}
            prefix={<Key theme="outline" size="18" />}
            allowClear
            placeholder={intl.formatMessage({ id: 'placeholderPassword' })}
          />
        </Item>
        <Item
          name="verifyCode"
          rules={validateRule(
            true,
            intl.formatMessage({ id: 'placeholderVerifyCode' }),
          )}
        >
          <Row gutter={12}>
            <Col span={16}>
              <Input
                bordered={loginConfigState.border}
                prefix={<FingerprintThree theme="outline" size="18" />}
                allowClear
                placeholder={intl.formatMessage({
                  id: 'placeholderVerifyCode',
                })}
              />
            </Col>
            <Col span={8}>
              <div>yzmz</div>
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
