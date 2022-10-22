import React, { useState } from 'react';
import { useIntl } from 'umi';
import { LoginEnum } from '@/utils';

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
  return {
    language,
    cardFormState,
    handleCheckForm,
  };
};
