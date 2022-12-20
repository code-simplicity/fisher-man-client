import React, { FC, useState } from 'react';
import { Button, message } from 'antd';
import { useCountDown } from 'ahooks';
import { injectIntl } from '@@/plugin-locale';
import { ComponentsProps } from '../../type';
import { FormInstance } from 'rc-field-form/es/interface';
import { useModel } from '@umijs/max';

export interface IAppEmailCountDownProps extends ComponentsProps {
  modelForm: FormInstance;
}

/**
 * 邮箱验证码
 * @param props
 * @constructor
 */
const AppEmailCountDown: FC<IAppEmailCountDownProps> = (props) => {
  const { intl, modelForm } = props;
  const { handleSendEmailCode } = useModel('registerModel');
  // 时间的hooks
  const [targetDateState, setTargetDateState] = useState<number>(0);
  // 倒计时的hooks
  const [countDown] = useCountDown({
    targetDate: targetDateState,
  });

  /**
   * 获取邮箱验证码
   */
  const handleEmailCode = async () => {
    // 校验邮箱
    const email = modelForm.getFieldValue('email');
    if (!email) {
      // 触发校验规则
      await modelForm.validateFields(['email']).catch(() => {});
      return;
    }
    // 发送邮箱验证码
    handleSendEmailCode
      .runAsync({ email })
      .then(() => {
        // 发送成功之后才可以触发倒计时
        setTargetDateState(Date.now() + 60000);
      })
      .catch((error) => {
        // 提示错误信息
        message.error(error);
      });
  };
  return (
    <Button
      block
      disabled={countDown !== 0}
      onClick={() => handleEmailCode()}
      loading={handleSendEmailCode.loading}
    >
      {countDown === 0
        ? intl.formatMessage({ id: 'getEmailCode' })
        : `倒计时${Math.round(countDown / 1000)}s`}
    </Button>
  );
};

export default injectIntl(AppEmailCountDown);
