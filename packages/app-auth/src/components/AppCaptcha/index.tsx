import React, { FC } from 'react';
import { useRequest } from 'ahooks';
import { getVerifyCode } from '@/services/auth';
import { Button } from 'antd';
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
    <Button
      type="primary"
      size="middle"
      ghost
      className="app-captcha"
      onClick={run}
    >
      <span dangerouslySetInnerHTML={{ __html: data }}></span>
    </Button>
  );
};

export default AppCaptcha;
