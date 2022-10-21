import React, { useState } from 'react';
import { useIntl } from 'umi';

// 登陆的状态
export default () => {
  // 多语言, 获取到浏览器中是否存在多语言，初始化
  const [language, setLanguage] = useState('' || 'zh_CH');

  return {
    language,
  };
};
