import React, { FC } from 'react';
import { useRequest } from 'ahooks';
import { getVerifyCode } from '@/services/auth';
import './index.less';

export interface AppCaptchaProps {}

/**
 * 获取图灵验证码的组件抽取
 * @constructor
 */
const AppCaptcha: FC<AppCaptchaProps> = () => {
  const { data, run } = useRequest(getVerifyCode, {
    debounceWait: 200,
  });
  return (
    <div
      className="app-captcha"
      dangerouslySetInnerHTML={{ __html: data }}
      onClick={run}
    ></div>
  );
};

export default AppCaptcha;
