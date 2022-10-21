import React, { FC, useState } from 'react';
import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Tooltip,
  Select,
} from 'antd';
import { useIntl, getLocale, useModel } from 'umi';
import './index.less';
import { setLocale } from '@@/plugin-locale';

import LoginForm from '@/pages/Login/components/LoginForm';

const prefixCls = 'login-container';
const { Item } = Form;
const { Option } = Select;

// 登陆模块
const Login: FC = (props) => {
  const intl = useIntl();
  // 语言
  const [defaultLanguage, setDefaultLanguage] = useState(
    '' || intl.formatMessage({ id: 'zh-CN' }),
  );
  const { language } = useModel('loginModel');

  const [headerTitle, setHeaderTitle] = useState(
    intl.formatMessage({ id: 'login' }),
  );

  // 选择多语言
  const handleChangeLanguage = (value: string) => {
    console.log('value', value);
  };

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-left`}>
        <Image
          preview={false}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          rootClassName={`${prefixCls}-left-image`}
          alt=""
        />
      </div>
      <div className={`${prefixCls}-right`}>
        <div className="absolute top-6 right-6">
          <Select
            defaultValue={defaultLanguage}
            style={{
              width: '70px',
            }}
            onChange={handleChangeLanguage}
          >
            <Option value="zh-CN">{intl.formatMessage({ id: 'zh_CH' })}</Option>
            <Option value="en-US">{intl.formatMessage({ id: 'en_US' })}</Option>
          </Select>
        </div>
        <div className={`${prefixCls}-right-box`}>
          <h2>{headerTitle}</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
