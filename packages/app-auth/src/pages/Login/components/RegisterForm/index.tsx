import React, { FC, useState } from 'react';
import { ComponentsProps } from '@/pages/Login/interface';
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Upload,
  UploadProps,
} from 'antd';
import { LoginEnum } from '@/utils';
import { useModel } from 'umi';
import { injectIntl } from '@@/plugin-locale';
import {
  AcceptEmail,
  FileCode,
  Key,
  PhoneTelephone,
  UploadPicture,
  User,
} from '@icon-park/react';

const { Item } = Form;
const { Option } = Select;

type RegisterFormProps = ComponentsProps;

// 注册表单
const RegisterForm: FC<RegisterFormProps> = ({ intl }) => {
  const { handleCheckForm, validateRule, formConfigState } =
    useModel('loginModel');
  const [emialCodeTextState, setEmialCodeTextState] = useState(
    intl.formatMessage({ id: 'getEmailCode' }),
  );
  // 注册
  const handleRegister = () => {};

  /**
   * 头像上传的参数
   */
  const uploadAvatarProps: UploadProps = {
    name: 'avatar', // 上传的名称
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // 上传的地址
    headers: {
      authorization: 'authorization-text',
    }, // 鉴权
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // 上传头像的组件
  const UploadAvatar = () => {
    return (
      <div className={`flex items-center justify-center flex-col`}>
        <Avatar
          icon={<User theme="outline" size="24" />}
          size={48}
          src=""
          alt={intl.formatMessage({ id: 'avatar' })}
        />
        <Upload {...uploadAvatarProps}>
          <Button
            className="mt-2"
            size="small"
            icon={<UploadPicture theme="outline" size="12" />}
          >
            {intl.formatMessage({ id: 'uploadAvatar' })}
          </Button>
        </Upload>
      </div>
    );
  };

  /**
   * 获取邮箱验证码
   */
  const handleEmailCode = () => {
    // 改变文字
    // 获取成功之后改变
  };

  return (
    <>
      <h2 className="text-xl">{intl.formatMessage({ id: 'register' })}</h2>
      <Form
        labelAlign="left"
        colon={false}
        {...formConfigState.formItemLayout}
        initialValues={{}}
        onFinish={handleRegister}
        autoComplete="off"
      >
        <Item
          name="avatar"
          rules={validateRule({
            required: false,
            message: intl.formatMessage({ id: 'placeholderAvatar' }),
          })}
        >
          <UploadAvatar />
        </Item>
        <Item
          name="username"
          rules={validateRule({
            message: intl.formatMessage({ id: 'placeholderRegisterUsername' }),
          })}
        >
          <Input
            bordered={formConfigState.border}
            prefix={<User theme="outline" size="18" />}
            allowClear
            placeholder={intl.formatMessage({
              id: 'placeholderRegisterUsername',
            })}
          />
        </Item>
        <Item
          name="password"
          rules={validateRule({
            message: intl.formatMessage({ id: 'placeholderPassword' }),
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
          name="email"
          rules={validateRule({
            message: intl.formatMessage({ id: 'placeholderEmail' }),
          })}
        >
          <Row gutter={12}>
            <Col span={16}>
              <Input
                bordered={formConfigState.border}
                prefix={<AcceptEmail theme="outline" size="18" />}
                allowClear
                placeholder={intl.formatMessage({ id: 'placeholderEmail' })}
              />
            </Col>
            <Col span={8}>
              <Button onClick={() => handleEmailCode()}>
                {emialCodeTextState}
              </Button>
            </Col>
          </Row>
        </Item>
        <Item
          name="emailCode"
          rules={validateRule({
            message: intl.formatMessage({ id: 'placeholderEmailCode' }),
          })}
        >
          <Input
            bordered={formConfigState.border}
            prefix={<FileCode theme="outline" size="18" />}
            allowClear
            placeholder={intl.formatMessage({ id: 'placeholderEmailCode' })}
          />
        </Item>
        <Item
          name="phone"
          rules={validateRule({
            required: false,
            message: intl.formatMessage({ id: 'placeholderPhone' }),
          })}
        >
          <Input
            bordered={formConfigState.border}
            prefix={<PhoneTelephone theme="outline" size="18" />}
            allowClear
            placeholder={intl.formatMessage({ id: 'placeholderPhone' })}
          />
        </Item>
        <Item
          name="sign"
          rules={validateRule({
            required: false,
            message: intl.formatMessage({ id: 'placeholderSign' }),
          })}
        >
          <Input.TextArea
            bordered={formConfigState.border}
            allowClear
            showCount
            maxLength={120}
            placeholder={intl.formatMessage({ id: 'placeholderSign' })}
          />
        </Item>
        <Item>
          <Button block type="primary" htmlType="submit">
            {intl.formatMessage({ id: 'register' })}
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
                onClick={() => handleCheckForm(LoginEnum.forgetPassword)}
              >
                {intl.formatMessage({ id: 'forgetPassword' })}
              </Button>
            </div>
          </div>
        </Item>
      </Form>
    </>
  );
};

export default injectIntl(RegisterForm);
