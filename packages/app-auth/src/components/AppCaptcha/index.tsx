import React, { FC } from 'react';
import { useRequest } from 'ahooks';
import { getVerifyCode } from '@/services/auth';
import { Button } from 'antd';
import './index.less';

export interface AppCaptchaProps {
  onRefreshCaptcha: any;
}

/**
 * 获取图灵验证码的组件抽取
 * @constructor
 */
const AppCaptcha: FC<AppCaptchaProps> = (props) => {
  let { onRefreshCaptcha } = props;
  const { data, run } = useRequest(getVerifyCode, {
    debounceWait: 200,
  });
  onRefreshCaptcha = () => {
    return run();
  };
  // 执行更新方法
  // TODO:明天继续编写上传头像的功能
  return (
    <Button
      type="primary"
      size="middle"
      ghost
      className="app-captcha"
      onClick={onRefreshCaptcha}
      style={{
        padding: 0,
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: data }}></span>
    </Button>
  );
};

export default AppCaptcha;
