import { Form } from 'antd';
import { useState } from 'react';
import { theme } from 'antd';
import { IAppSettingConfigData } from '../type';

const { useToken } = theme;

/**
 * 验证函数参数类型
 */
interface validateRuleProps {
  required?: boolean; // 是否必填
  message?: string; // 验证消息
  pattern?: RegExp; // 正则
  args?: any; // 其他参数
  rule?: validateRuleProps; // 其他的校验规则
}

const defaultAppSettingConfig = {
  colorPrimary: '#1677ff',
  border: false,
  formItemLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  },
  formColon: false,
};

export default () => {
  const [appSettingForm] = Form.useForm();
  const { token } = useToken();
  // app配置
  const [appSettingConfigData, setAppSettingConfigData] =
    useState<IAppSettingConfigData>(defaultAppSettingConfig);

  /**
   * 配置appConfig
   * @param changedValues
   * @param allValues
   */
  const handleAppSettingConfig = (
    changedValues: { colorPrimary: any },
    allValues: any,
  ) => {
    const colorObj = changedValues?.colorPrimary
      ? { colorPrimary: allValues?.colorPrimary?.hex }
      : {};
    setAppSettingConfigData({ ...allValues, ...colorObj });
  };

  // 表单统一验证规则
  const onFormValidateRule = (
    validateRuleProps: validateRuleProps,
  ): validateRuleProps[] => {
    const {
      required = true,
      message,
      rule,
      pattern,
      ...args
    } = validateRuleProps;
    return [
      {
        required: required,
        message: message,
        pattern,
        args,
      },
      {
        ...rule,
      },
    ];
  };

  return {
    appSettingForm,
    appSettingConfigData,
    onFormValidateRule,
    setAppSettingConfigData,
    handleAppSettingConfig,
  };
};
