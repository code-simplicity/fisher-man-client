import { FC } from 'react';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Tooltip,
} from 'antd';
import { useIntl, getLocale } from 'umi';
import './index.less';
import { setLocale } from '@@/plugin-locale';

const prefixCls = 'login-container';
const { Item } = Form;

// 登陆模块
const Login: FC = () => {
  const intl = useIntl();
  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-left`}>
        <Image
          preview={false}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          rootClassName={`${prefixCls}-left-image`}
          alt=""
        />
      </div>
      <div className={`${prefixCls}-right`}>
        <div className={`${prefixCls}-right-box`}>
          <h2>登陆</h2>
          <Form labelAlign="left" colon={false} labelCol={{ span: 3 }}>
            <Item label="用户名" name="username">
              <Input placeholder="请输入用户名" />
            </Item>
            <Item label="密码" name="password">
              <Input.Password placeholder="请输入密码" />
            </Item>
            <Item label="验证码" name="verifyCode">
              <Row gutter={12}>
                <Col span={16}>
                  <Input placeholder="请输入验证码" />
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
                  注册
                </Button>
              </div>
            </Item>
            <Divider>其他方式登陆</Divider>
            <Item>
              <Row justify="space-between">
                <Col span={8}>
                  <Tooltip title="微信">
                    <Avatar src="" alt="wx" />
                  </Tooltip>
                </Col>
                <Col span={8}>
                  <Tooltip title="github">
                    <Avatar src="" alt="github" />
                  </Tooltip>
                </Col>
                <Col span={8}>
                  <Tooltip title="QQ">
                    <Avatar src="" alt="QQ" />
                  </Tooltip>
                </Col>
              </Row>
            </Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
