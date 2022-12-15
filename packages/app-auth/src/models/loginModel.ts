import { useState } from 'react';
import { LoginEnum } from '@/utils';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { login } from '@/services/auth';

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

  const handleLoginModel = useRequest(login, {
    debounceWait: 300,
    manual: true,
    onSuccess: (data) => {
      message.success(data.message);
    },
  });

  return {
    language,
    cardFormState,
    handleCheckForm,
    handleLoginModel,
  };
};
