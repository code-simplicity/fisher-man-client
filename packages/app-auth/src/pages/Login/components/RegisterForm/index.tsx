import { FC } from 'react';
import { ComponentsProps } from '@/pages/Login/interface';
import { Form } from 'antd';

const { Item } = Form;

interface RegisterFormProps extends ComponentsProps {}

// 注册表单
const RegisterForm: FC<RegisterFormProps> = ({ intl }) => {
  return (
    <>
      <Form></Form>
    </>
  );
};

export default RegisterForm;
