import React, { FC } from 'react';
import { ComponentsProps } from '@/pages/Login/interface';
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Upload,
  UploadProps,
} from 'antd';
import { LoginEnum } from '@/utils';
import { useModel } from 'umi';
import { injectIntl } from '@@/plugin-locale';
import {
  AcceptEmail,
  FileCode,
  FingerprintThree,
  Key,
  PhoneTelephone,
  UploadPicture,
  User,
} from '@icon-park/react';
import AppCaptcha from '@/components/AppCaptcha';
import AppEmailCountDown from '@/components/AppEmailCountDown';
import AppSvgIcon from '@/components/AppSvgIcon';

const { Item } = Form;

type RegisterFormProps = ComponentsProps;

// 注册表单
const RegisterForm: FC<RegisterFormProps> = ({ intl }) => {
  const { handleCheckForm } = useModel('loginModel');
  const { handleInitAvatar, handleRegisterUser, handleSendEmailCode } =
    useModel('registerModel');
  const { appSettingConfigData, onFormValidateRule } =
    useModel('appSettingModel');
  // 注册表单的hooks
  const [registerModelForm] = Form.useForm<SERVICE.RegisterUserType>();

  // 注册
  const handleRegister = (values: any) => {
    const data = {
      ...values,
      // avatar: handleInitAvatar.data?.data?.avatarUrl,
    };
    // 设置数据
    console.log('values ==>', data);
    // 执行
    handleRegisterUser.run(data);
  };

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
        <Item
          name="avatar"
          rules={onFormValidateRule({
            required: false,
          })}
          noStyle
        >
          <Avatar
            icon={<User theme="outline" size="24" />}
            size={48}
            src={handleInitAvatar.data?.data?.avatarUrl}
            alt={intl.formatMessage({ id: 'avatar' })}
          />
        </Item>
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

  return (
    <>
      <h2 className="text-xl">{intl.formatMessage({ id: 'register' })}</h2>
      <Form
        labelAlign="left"
        name="registerForm"
        form={registerModelForm}
        colon={appSettingConfigData.formColon}
        {...appSettingConfigData.formItemLayout}
        onFinish={handleRegister}
        autoComplete="off"
        initialValues={{
          username: '测试测试',
          password: '123456',
          email: 'dupyi0912@gmail.com',
          emailCode: '123456',
          captcha: '123',
        }}
      >
        <Item>
          <UploadAvatar />
        </Item>
        <Item
          name="username"
          rules={onFormValidateRule({
            message: intl.formatMessage({ id: 'placeholderRegisterUsername' }),
          })}
        >
          <Input
            bordered={appSettingConfigData.border}
            prefix={
              <AppSvgIcon>
                <User theme="outline" size="18" />
              </AppSvgIcon>
            }
            allowClear
            placeholder={intl.formatMessage({
              id: 'placeholderRegisterUsername',
            })}
          />
        </Item>
        <Item
          name="password"
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
              <AppEmailCountDown modelForm={registerModelForm} />
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
          <Row gutter={12}>
            <Col span={15}>
              <Item
                name="captcha"
                rules={onFormValidateRule({
                  message: intl.formatMessage({ id: 'placeholderCaptcha' }),
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
                  placeholder={intl.formatMessage({ id: 'placeholderCaptcha' })}
                />
              </Item>
            </Col>
            <Col span={9}>
              <AppCaptcha />
            </Col>
          </Row>
        </Item>
        <Item
          name="phone"
          rules={onFormValidateRule({
            required: false,
            message: intl.formatMessage({ id: 'placeholderPhone' }),
          })}
        >
          <Input
            bordered={appSettingConfigData.border}
            prefix={
              <AppSvgIcon>
                <PhoneTelephone theme="outline" size="18" />
              </AppSvgIcon>
            }
            allowClear
            placeholder={intl.formatMessage({ id: 'placeholderPhone' })}
          />
        </Item>

        {/*<Item*/}
        {/*  name="sign"*/}
        {/*  rules={onFormValidateRule({*/}
        {/*    required: false,*/}
        {/*    message: intl.formatMessage({ id: 'placeholderSign' }),*/}
        {/*  })}*/}
        {/*>*/}
        {/*  <Input.TextArea*/}
        {/*    bordered={appSettingConfigData.border}*/}
        {/*    allowClear*/}
        {/*    showCount*/}
        {/*    maxLength={120}*/}
        {/*    placeholder={intl.formatMessage({ id: 'placeholderSign' })}*/}
        {/*  />*/}
        {/*</Item>*/}
        <Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={handleRegisterUser.loading}
          >
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
