import React, { forwardRef, useImperativeHandle } from 'react';
import { useRequest } from 'ahooks';
import { getVerifyCode } from '@/services/auth';
import { Button } from 'antd';
import './index.less';

export interface IAppCaptchaRef {
  onRefreshCaptcha?: () => void; // 刷新验证码的函数
}

export interface IAppCaptchaProps {}

/**
 * 获取图灵验证码的组件抽取
 * @constructor
 */
const AppCaptcha = (props: any, ref: React.Ref<unknown> | undefined) => {
  const { data, run } = useRequest(getVerifyCode, {
    debounceWait: 200,
  });
  // 执行更新方法
  const handleRefreshCaptcha = () => {
    run();
  };
  // 暴露刷新验证码的方法给上层组件，提供调用
  useImperativeHandle(
    ref,
    () => ({
      onRefreshCaptcha: () => {
        handleRefreshCaptcha();
      },
    }),
    [handleRefreshCaptcha],
  );

  return (
    <Button
      type="primary"
      size="middle"
      ghost
      className="app-captcha"
      onClick={handleRefreshCaptcha}
      style={{
        padding: 0,
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: data }}></span>
    </Button>
  );
};

export default forwardRef<IAppCaptchaRef, IAppCaptchaProps>(AppCaptcha);
