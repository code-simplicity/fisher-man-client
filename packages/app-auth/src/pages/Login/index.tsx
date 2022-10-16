import { FC } from 'react';
import { Button, Col, Form, Image, Input, Row } from 'antd';
import './index.less';

const prefixCls = 'login-container';
const { Item } = Form;
// 登陆模块
const Login: FC = () => {
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
                登陆
              </Button>
            </Item>
            <Item>
              <Row>
                <Col>
                  <Button>登陆</Button>
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
