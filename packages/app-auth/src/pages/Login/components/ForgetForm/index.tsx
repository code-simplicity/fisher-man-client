import React, { FC } from 'react';
import { injectIntl } from '@@/plugin-locale';
import { ComponentsProps } from '@/pages/Login/interface';
import { Button, Form } from 'antd';
import { LoginEnum } from '@/utils';
import { useModel } from 'umi';

const { Item } = Form;

interface ForgetFormProps extends ComponentsProps {}

// 忘记密码
const ForgetForm: FC<ForgetFormProps> = ({ intl }) => {
  const { handleCheckForm } = useModel('loginModel');
  return (
    <>
      <h2 className="text-xl">
        {intl.formatMessage({ id: 'forgetPassword' })}
      </h2>
      <Form>
        <Item></Item>
        <Item>
          <div className="flex items-center justify-between">
            <Button
              type="link"
              onClick={() => handleCheckForm(LoginEnum.login)}
            >
              {intl.formatMessage({ id: 'login' })}
            </Button>
            <div className={`register-btn`}>
              <Button
                type="text"
                danger
                onClick={() => handleCheckForm(LoginEnum.register)}
              >
                {intl.formatMessage({ id: 'register' })}
              </Button>
            </div>
          </div>
        </Item>
      </Form>
    </>
  );
};

export default injectIntl(ForgetForm);
