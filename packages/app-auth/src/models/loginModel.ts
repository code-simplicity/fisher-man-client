import { useState } from 'react';
import { setLocale } from '@@/plugin-locale';

// 登陆的状态
export default () => {
  // 多语言
  const [language, setLanguage] = useState('1');
  return {
    language,
  };
};
