import { useState } from 'react';

// 登陆的状态
export default () => {
  // 多语言
  const [language, setLanguage] = useState();
  return {
    language,
  };
};
