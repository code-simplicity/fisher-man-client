import React, { useState } from 'react';
import { useIntl } from 'umi';
import { LoginEnum } from '@/utils';

interface loginConfigStateProps {
  border?: boolean;
}

interface validateRuleProps {
  required: boolean;
  message: string;
  args: any;
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

  // 登陆表单配置
  const [loginConfigState, setLoginConfigState] =
    useState<loginConfigStateProps>({
      border: false,
    });

  // 设置配置选项
  const handleSetLoginConfigState = (config: loginConfigStateProps) => {
    // 对登陆的表单进行配置设置
    setLoginConfigState({ ...loginConfigState, ...config });
  };

  // 验证规则
  const validateRule = (required = true, message?: string, args?: any) => {
    return [
      {
        required: required,
        message: message,
        ...args,
      },
    ];
  };

  return {
    language,
    cardFormState,
    loginConfigState,
    handleCheckForm,
    handleSetLoginConfigState,
    validateRule,
  };
};
