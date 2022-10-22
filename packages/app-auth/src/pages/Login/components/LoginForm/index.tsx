import { injectIntl } from '@@/plugin-locale';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { FC } from 'react';
import { ComponentsProps } from '@/pages/Login/interface';
import OtherLoginMode from '../OtherLoginMode';

import './index.less';
import { useModel } from 'umi';
import { LoginEnum } from '@/utils';

const { Item } = Form;

interface LoginFormProps extends ComponentsProps {}

// 登陆表单
const LoginForm: FC<LoginFormProps> = ({ intl }) => {
  const { cardFormState, handleCheckForm } = useModel('loginModel');

  return (
    <>
      <h2 className="text-xl">
        {intl.formatMessage({ id: 'loginWithAccountPassword' })}
      </h2>
      <Form labelAlign="left" colon={false} labelCol={{ span: 4 }}>
        <Item name="username">
          <Input
            bordered={false}
            placeholder={intl.formatMessage({ id: 'placeholderUsername' })}
          />
        </Item>
        <Item name="password">
          <Input.Password
            bordered={false}
            placeholder={intl.formatMessage({ id: 'placeholderPassword' })}
          />
        </Item>
        <Item name="verifyCode">
          <Row gutter={12}>
            <Col span={16}>
              <Input
                bordered={false}
                placeholder={intl.formatMessage({
                  id: 'placeholderVerifyCode',
                })}
              />
            </Col>
            <Col span={8}>
              <Input placeholder="请输入验证码" />
            </Col>
          </Row>
        </Item>
        <Item>
          <Button block type="primary">
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
