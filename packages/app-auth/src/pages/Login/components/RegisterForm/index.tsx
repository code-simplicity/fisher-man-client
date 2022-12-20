import React, { FC, useRef, useState } from 'react';
import { ComponentsProps } from '../../../../type';
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
import AppCaptcha, { IAppCaptchaRef } from '@/components/AppCaptcha';
import AppEmailCountDown from '@/components/AppEmailCountDown';
import AppSvgIcon from '@/components/AppSvgIcon';
import ImgCrop from 'antd-img-crop';
import './index.less';
import AppSpin from '@/components/AppSpin';

const { Item } = Form;

type RegisterFormProps = ComponentsProps;

// 注册表单
const RegisterForm: FC<RegisterFormProps> = ({ intl }) => {
  const { handleCheckForm } = useModel('loginModel');
  const {
    handleInitAvatar,
    handleRegisterUser,
    handleSendEmailCode,
    handleUploadAvatarModel,
  } = useModel('registerModel');
  const { appSettingConfigData, onFormValidateRule } =
    useModel('appSettingModel');
  // 获取验证码子组件的ref
  const appCaptchaRef = useRef<IAppCaptchaRef | any>();
  // 注册表单的hooks
  const [registerModelForm] = Form.useForm<SERVICE.RegisterUserType>();
  // 注册
  const handleRegister = (values: any) => {
    const data = {
      ...values,
      avatar: values.avatar || handleInitAvatar.data?.data?.avatarUrl,
    };
    // 执行
    handleRegisterUser.runAsync(values).then(() => {
      // 清除注册列表的数据
      registerModelForm.resetFields([
        'username',
        'password',
        'email',
        'emailCode',
        'captcha',
        'phone',
      ]);
      // 验证码更新
      appCaptchaRef?.current?.onRefreshCaptcha();
    });
  };

  // 控制头像上传
  const handleUploadAvatar = (file: File) => {
    handleUploadAvatarModel.runAsync({ file: file }).then((res) => {
      // 设置头像的数据
      registerModelForm.setFieldValue('avatar', res?.data?.url);
    });
  };

  /**
   * 头像上传的参数
   */
  const uploadAvatarProps: UploadProps = {
    accept: 'image/png, image/jpeg, image/jpg, image/gif',
    showUploadList: false,
    // 手动上传，上传之前的回调
    beforeUpload: (file) => {
      handleUploadAvatar(file);
      // 直接在这里进行接口请求就行
      return Upload.LIST_IGNORE;
    },
  };

  // 头像剪切参数配置
  const ImgCropProps = {
    rotate: true,
    zoom: true,
    modalTitle: '头像剪切',
    modalWidth: '420px',
  };

  // 上传头像的组件
  const UploadAvatar = () => {
    return (
      <div className={`flex items-center justify-center flex-col`}>
        <ImgCrop {...ImgCropProps}>
          <Upload {...uploadAvatarProps}>
            <Item
              name="avatar"
              rules={onFormValidateRule({
                required: false,
              })}
              noStyle
            >
              {handleUploadAvatarModel.loading ? (
                <Avatar icon={<AppSpin />} size={68} />
              ) : (
                <Avatar
                  icon={
                    <AppSvgIcon>
                      <User theme="outline" size="36" />
                    </AppSvgIcon>
                  }
                  size={68}
                  src={
                    registerModelForm.getFieldValue('avatar') ||
                    handleInitAvatar.data?.data?.avatarUrl
                  }
                  alt={intl.formatMessage({ id: 'avatar' })}
                />
              )}
            </Item>
            <div className="upload-avatar-btn">
              <Button
                size="small"
                shape="circle"
                icon={<UploadPicture theme="outline" size="12" />}
              />
            </div>
          </Upload>
        </ImgCrop>
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
