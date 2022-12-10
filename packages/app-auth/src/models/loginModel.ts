import React, { useState } from 'react';
import { useIntl } from 'umi';
import { LoginEnum } from '@/utils';

interface formConfigStateProps {
  border?: boolean;
  formItemLayout?: {
    labelCol: object;
    wrapperCol: object;
  };
}

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

// 登陆的状态
export default () => {
  // 多语言, 获取到浏览器中是否存在多语言，初始化
  const [language, setLanguage] = useState('' || 'zh_CH');
  // 设置卡片
  const [cardFormState, setCardFromState] = useState<string>(LoginEnum.login);
  // 切换不同的表单
  const handleCheckForm = (state: string) => {
    setCardFromState(state);
  };

  // 表单配置
  const [formConfigState, setFormConfigState] = useState<formConfigStateProps>({
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
  });

  // 设置配置选项
  const handleSetLoginConfigState = (config: formConfigStateProps) => {
    // 对登陆的表单进行配置设置
    setFormConfigState({ ...formConfigState, ...config });
  };

  // 验证规则
  const validateRule = (
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
    language,
    cardFormState,
    formConfigState,
    handleCheckForm,
    handleSetLoginConfigState,
    validateRule,
  };
};
