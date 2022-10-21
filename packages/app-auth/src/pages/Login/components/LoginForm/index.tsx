import { injectIntl } from '@@/plugin-locale';
import { Button, Col, Divider, Form, Input, Row, Tooltip } from 'antd';
import {
  GithubFilled,
  GooglePlusOutlined,
  QqCircleFilled,
  WechatFilled,
} from '@ant-design/icons';
import React, { FC } from 'react';
import { IntlShape } from 'react-intl';
import { ComponentsProps } from '@/pages/Login/interface';
import './index.less';

const { Item } = Form;

interface LoginFormProps extends ComponentsProps {}

// 登陆表单
const LoginForm: FC<LoginFormProps> = ({ intl }) => {
  return (
    <>
      <Form labelAlign="left" colon={false} labelCol={{ span: 3 }}>
        <Item label={intl.formatMessage({ id: 'username' })} name="username">
          <Input
            placeholder={intl.formatMessage({ id: 'placeholderUsername' })}
          />
        </Item>
        <Item label={intl.formatMessage({ id: 'password' })} name="password">
          <Input.Password
            placeholder={intl.formatMessage({ id: 'placeholderPassword' })}
          />
        </Item>
        <Item
          label={intl.formatMessage({ id: 'verifyCode' })}
          name="verifyCode"
        >
          <Row gutter={12}>
            <Col span={16}>
              <Input
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
          <div className={`register-btn`}>
            <Button type="text" danger>
              {intl.formatMessage({ id: 'register' })}
            </Button>
          </div>
        </Item>
        <Divider plain>
          <h4>{intl.formatMessage({ id: 'otherWaysToLogIn' })}</h4>
        </Divider>
        <Item>
          <Row justify="space-between">
            <Col span={6}>
              <Tooltip title={intl.formatMessage({ id: 'wechat' })}>
                <div className={`other-login-mode`}>
                  <WechatFilled style={{ fontSize: '22px' }} />
                </div>
              </Tooltip>
            </Col>
            <Col span={6}>
              <Tooltip title={intl.formatMessage({ id: 'github' })}>
                <div className={`other-login-mode`}>
                  <GithubFilled style={{ fontSize: '22px' }} />
                </div>
              </Tooltip>
            </Col>
            <Col span={6}>
              <Tooltip title={intl.formatMessage({ id: 'qq' })}>
                <div className={`other-login-mode`}>
                  <QqCircleFilled style={{ fontSize: '22px' }} />
                </div>
              </Tooltip>
            </Col>
            <Col span={6}>
              <Tooltip title={intl.formatMessage({ id: 'google' })}>
                <div className={`other-login-mode`}>
                  <GooglePlusOutlined style={{ fontSize: '22px' }} />
                </div>
              </Tooltip>
            </Col>
          </Row>
        </Item>
      </Form>
    </>
  );
};

// @ts-ignore
export default injectIntl(LoginForm);
