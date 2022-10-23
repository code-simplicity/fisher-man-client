import React, { FC, useState } from 'react';
import {
  Form,
  Image,
  Select,
  Carousel,
  Tabs,
  Card,
  ConfigProvider,
} from 'antd';
import { useIntl, getLocale, useModel } from 'umi';
import { setLocale } from '@@/plugin-locale';
import './index.less';
import { SketchPicker } from 'react-color';

import { LoginEnum } from '@/utils';
import ForgetForm from '@/pages/Login/components/ForgetForm';
import LoginForm from '@/pages/Login/components/LoginForm';
import SweepQRCode from '@/pages/Login/components/SweepQRCode';
import RegisterForm from '@/pages/Login/components/RegisterForm';
import configurationColor from '@/utils/ConfigurationColor';

const prefixCls = 'login-container';
const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;

// 登陆模块
const Login: FC = (props) => {
  const intl = useIntl();
  // 语言
  const [defaultLanguage, setDefaultLanguage] = useState(
    getLocale() || intl.formatMessage({ id: 'zh-CN' }),
  );
  const { cardFormState } = useModel('loginModel');

  const [headerTitle, setHeaderTitle] = useState(
    intl.formatMessage({ id: 'fisherManApp' }),
  );

  // 选择多语言
  const handleChangeLanguage = (value: string) => {
    // 设置当前的多语言
    setLocale(value);
  };

  // 获取不同的组件
  const getDifferentComponents = () => {
    if (cardFormState === LoginEnum.login) {
      return (
        <Tabs>
          <TabPane
            tab={intl.formatMessage({ id: 'accountLogin' })}
            key="accountLogin"
          >
            <LoginForm />
          </TabPane>
          <TabPane
            tab={intl.formatMessage({ id: 'sweepQRCodeLogin' })}
            key="sweepQRCodeLogin"
          >
            <SweepQRCode />
          </TabPane>
        </Tabs>
      );
    }
    if (cardFormState === LoginEnum.forgetPassword) {
      return <ForgetForm />;
    }
    if (cardFormState === LoginEnum.register) {
      return <RegisterForm />;
    }
  };

  const [color, setColor] = useState(configurationColor('#ca013d'));

  const onColorChange = (nextColor: string) => {
    console.log('nextColor ==>', nextColor);
    console.log(
      'configurationColor(nextColor) ==>',
      configurationColor(nextColor),
    );
    setColor(configurationColor(nextColor));
    ConfigProvider.config({
      theme: color,
    });
  };

  return (
    <div
      className={`${prefixCls} bg-gradient-to-bl from-blue-600 md:from-yellow-500`}
    >
      <div className="md:hidden sm:hidden absolute top-6 right-6">
        <Select
          defaultValue={defaultLanguage}
          bordered={false}
          popupClassName="w-12"
          onChange={handleChangeLanguage}
        >
          <Option value="zh-CN">{intl.formatMessage({ id: 'zh-CH' })}</Option>
          <Option value="en-US">{intl.formatMessage({ id: 'en-US' })}</Option>
        </Select>
      </div>
      <div className={`${prefixCls}-wrapper`}>
        <div className={`${prefixCls}-wrapper-content`}>
          <div className="text-3xl absolute top-12 left-2 z-50 md:hidden sm:hidden">
            <div>{headerTitle}</div>
            <SketchPicker
              presetColors={['#1890ff', '#25b864', '#ff6f00']}
              color={color.primaryColor}
              onChange={({ hex }) => {
                onColorChange(hex);
              }}
            />
          </div>
          <Image
            preview={false}
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNzUycHQiIGhlaWdodD0iNzUycHQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDc1MiA3NTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiA8Zz4KICA8cGF0aCBkPSJtNTA4LjAxIDI0MC40NGMtMS4xODM2IDAtMi45NjA5LTAuNTkzNzUtNC4xNDQ1LTEuNzc3My0yLjM2NzItMi4zNjcyLTIuMzY3Mi01LjkxOC0wLjU5Mzc1LTguMjg5MWw0OC41NDMtNTQuNDYxYzIuMzY3Mi0yLjM2NzIgNS45MTgtMi4zNjcyIDguMjg5MS0wLjU5Mzc1IDIuMzY3MiAyLjM2NzIgMi4zNjcyIDUuOTE4IDAuNTkzNzUgOC4yODkxbC00OC41NDMgNTQuNDY1Yy0xLjE4MzYgMS4xODM2LTIuMzY3MiAyLjM2NzItNC4xNDQ1IDIuMzY3MnoiLz4KICA8cGF0aCBkPSJtNDg3LjI5IDIxNy45NWMtMC41OTM3NSAwLTEuMTgzNiAwLTIuMzY3Mi0wLjU5Mzc1LTIuOTYwOS0xLjE4MzYtNC43MzQ0LTQuNzM0NC0zLjU1MDgtNy42OTUzbDE3Ljc1OC00NS41ODJjMS4xODM2LTIuOTYwOSA0LjczNDQtNC43MzQ0IDcuNjk1My0zLjU1MDggMi45NjA5IDEuMTgzNiA0LjczNDQgNC43MzQ0IDMuNTUwOCA3LjY5NTNsLTE3Ljc1OCA0NS41ODJjLTEuMTgzNiAyLjM2NzItMi45NjA5IDQuMTQ0NS01LjMyODEgNC4xNDQ1eiIvPgogIDxwYXRoIGQ9Im0yMjEuNSAyODIuNDdjLTEuNzc3MyAwLTIuOTYwOS0wLjU5Mzc1LTQuMTQ0NS0xLjc3NzNsLTQ2LjE3Ni00Ny4zNTljLTIuMzY3Mi0yLjM2NzItMi4zNjcyLTUuOTE4IDAtOC4yODkxIDIuMzY3Mi0yLjM2NzIgNS45MTgtMi4zNjcyIDguMjg5MSAwbDQ2LjE3NiA0Ny4zNTljMi4zNjcyIDIuMzY3MiAyLjM2NzIgNS45MTggMCA4LjI4OTEtMS4xODM2IDEuMTg3NS0yLjM2NzIgMS43NzczLTQuMTQ0NSAxLjc3NzN6Ii8+CiAgPHBhdGggZD0ibTIwOC40NyAzMDUuNTVjLTAuNTkzNzUgMC0xLjc3NzMgMC0yLjM2NzItMC41OTM3NWwtMzkuNjY0LTE4Ljk0MWMtMi45NjA5LTEuMTgzNi00LjE0NDUtNC43MzQ0LTIuOTYwOS03LjY5NTMgMS4xODM2LTIuOTYwOSA0LjczNDQtNC4xNDQ1IDcuNjk1My0yLjk2MDlsMzkuNjY0IDE4Ljk0MWMyLjk2MDkgMS4xODM2IDQuMTQ0NSA0LjczNDQgMi45NjA5IDcuNjk1My0xLjE4MzYgMi4zNzExLTIuOTYwOSAzLjU1NDctNS4zMjgxIDMuNTU0N3oiLz4KICA8cGF0aCBkPSJtNTgwLjgyIDI5NS40OWMtNy4xMDU1LTYuNTExNy0xNy43NTgtOS40NzI3LTI3LjgyNC01LjkxOC0xMC4wNjIgMi45NjA5LTE2LjU3NCAxMS4yNDYtMTguMzUyIDIyLjQ5NmwtMTMuMDIzIDU2LjIzOGMtMC41OTM3NSAxLjE4MzYtMS43NzczIDIuMzY3Mi0yLjk2MDkgMi4zNjcyLTEuMTgzNiAwLTIuOTYwOS0wLjU5Mzc1LTMuNTUwOC0xLjc3NzNsLTEwLjY1Ni0yNC44NjMgMy41NTA4LTUuOTE4YzguMjg5MS0xMy4wMjMgNC43MzQ0LTI5LjU5OC04Ljg3ODktMzkuMDctNC43MzQ0LTIuOTYwOS0xMC4wNjItNS4zMjgxLTE1Ljk4NC01LjMyODFsLTEwLjA2Mi0yNC4yN2MwLjU5Mzc1LTUuMzI4MS0xLjE4MzYtMTEuMjQ2LTQuMTQ0NS0xNS45ODQtMS43NzczLTIuMzY3Mi0zLjU1MDgtNC43MzQ0LTUuOTE4LTcuMTA1NWwtMjUuNDUzLTY1LjcxMWMtNS45MTgtMTQuMjA3LTE2LjU3NC0yMC43MTktMjcuODI0LTE1Ljk4NC05LjQ3MjcgMy41NTA4LTE3LjE2OCAxNC44MDEtMTMuMDIzIDI2LjY0MWwyMC4xMjkgNTkuMTk5Yy0wLjU5Mzc1IDAuNTkzNzUtMS4xODM2IDEuNzc3My0xLjc3NzMgMi45NjA5bC0xMC42NTYgMTguMzUyLTQuNzM0NC05LjQ3MjdjMi45NjA5LTE1Ljk4NC03LjY5NTMtMjkuNTk4LTIwLjEyOS0zNC45MjZsLTIzLjY4LTQxLjQzOGMtNC43MzQ0LTguODc4OS0xMS44NC0xMS4yNDYtMTcuMTY4LTExLjI0Ni03LjY5NTMgMC0xNS4zOTEgNC4xNDQ1LTE5LjUzNSAxMC42NTYtMS43NzczIDMuNTUwOC00LjczNDQgMTAuNjU2IDAuNTkzNzUgMTkuNTM1bDIwLjcxOSAzNy44ODdjLTEuMTgzNiAxLjc3NzMtMS43NzczIDMuNTUwOC0yLjk2MDkgNS45MThsLTcuNjk1MyAxOC45NDEtMTYuNTc0LTIxLjkwMmMtMTAuMDYyLTEzLjAyMy0yMS45MDItMTIuNDMtMjkuMDA4LTcuMTA1NS03LjEwNTUgNC43MzQ0LTExLjg0IDE1LjM5MS01LjkxOCAyNC4yN2wzMy4xNTIgNDkuNzI3LTEyLjQzIDI5LjU5OC0yMS45MDItMTguMzUyYy0xMC4wNjItOC4yODkxLTE5LjUzNS02LjUxMTctMjQuODYzLTEuMTgzNi00LjczNDQgNC43MzQ0LTcuMTA1NSAxNC4yMDcgMC41OTM3NSAyMi40OTYgMS4xODM2IDEuMTgzNiAxNS45ODQgMTMuNjE3IDMyLjU1OSAyOS41OThsLTEwLjA2MiAyNC4yNy01LjkxOC0yNS40NTNjLTIuOTYwOS0xNC44MDEtMTIuNDMtMjYuMDQ3LTI1LjQ1My0zMC43ODEtMTMuMDIzLTQuMTQ0NS0yNy44MjQtMS4xODM2LTM3Ljg4NyA4LjI4OTEtMTAuNjU2IDEwLjA2Mi0xNC4yMDcgMjUuNDUzLTEwLjA2MiA0Mi4wMzEgMS43NzczIDYuNTExNyAzLjU1MDggMTQuMjA3IDUuMzI4MSAyMS4zMTIgMTAuNjU2IDQzLjgwNSAyMy4wODYgOTIuOTQxIDQ0Ljk4OCAxMjcuODcgMTcuNzU4IDI3LjgyNCA1Mi42ODggNDcuOTQ5IDgyLjI4NSA0Ny45NDkgMy41NTA4IDAgNy4xMDU1IDAgMTAuMDYyLTAuNTkzNzUgMjYuNjQxLTQuNzM0NCA1OC42MDUtMTcuMTY4IDk1Ljg5OC02OC4wNzggNS4zMjgxIDEuNzc3MyAxMS4yNDYgMi45NjA5IDE2LjU3NCA0LjE0NDUgMi45NjA5IDAuNTkzNzUgNS45MTggMC41OTM3NSA4Ljg3ODkgMC41OTM3NSAyNi42NDEgMCA1OS43ODktMTguOTQxIDc2LjM2My00NC45ODggMjIuNDk2LTM1LjUyIDM0LjkyNi04Ny4wMiA0Ni4xNzYtMTMyLjAxbDAuNTkzNzUtMi45NjA5YzEuNzc3My03LjEwNTUgMy41NTA4LTEzLjYxNyA0LjczNDQtMTkuNTM1IDIuOTU3LTEyLjQzNCAwLjU4NTk0LTI0LjI3My03LjEwOTQtMzEuMzc5em0tNjIuNzUgMTA5LjUyYy01LjkxOCA1LjMyODEtNjUuMTE3IDU3LjQyMi04MS4xMDIgODEuMTAyLTcuMTA1NSAxMS4yNDYtMTMuNjE3IDIxLjMxMi0yMC4xMjkgMjkuNTk4LTEuNzc3MyAyLjM2NzItNC4xNDQ1IDQuNzM0NC01LjkxOCA3LjEwNTUgMCAwIDAgMC41OTM3NS0wLjU5Mzc1IDAuNTkzNzUtMTAuMDYyIDExLjg0LTE4Ljk0MSAyMS4zMTItMjcuODI0IDI3LjgyNC0xLjc3NzMgMS4xODM2LTIuOTYwOSAyLjM2NzItNC43MzQ0IDMuNTUwOGwtMC41OTM3NSAwLjU5Mzc1Yy0xLjc3NzMgMS4xODM2LTIuOTYwOSAyLjM2NzItNC43MzQ0IDIuOTYwOSAwIDAtMC41OTM3NSAwLTAuNTkzNzUgMC41OTM3NS00LjczNDQgMi45NjA5LTkuNDcyNyA1LjMyODEtMTMuNjE3IDcuMTA1NSAwIDAtMC41OTM3NSAwLTAuNTkzNzUgMC41OTM3NS0xLjE4MzYgMC41OTM3NS0yLjM2NzIgMC41OTM3NS0zLjU1MDggMS4xODM2LTAuNTkzNzUgMC0xLjE4MzYgMC41OTM3NS0xLjc3NzMgMC41OTM3NS0xLjE4MzYgMC41OTM3NS0xLjc3NzMgMC41OTM3NS0yLjk2MDkgMS4xODM2LTAuNTkzNzUgMC0xLjc3NzMgMC41OTM3NS0yLjM2NzIgMC41OTM3NS0wLjU5Mzc1IDAtMS43NzczIDAuNTkzNzUtMi4zNjcyIDAuNTkzNzUtMS4xODM2IDAtMS43NzczIDAuNTkzNzUtMi45NjA5IDAuNTkzNzUtMC41OTM3NSAwLTEuMTgzNiAwLjU5Mzc1LTEuNzc3MyAwLjU5Mzc1LTEuNzc3MyAwLjU5Mzc1LTMuNTUwOCAwLjU5Mzc1LTQuNzM0NCAxLjE4MzYtMjQuMjcgNC4xNDQ1LTU4LjAxMi0xMy42MTctNzMuOTk2LTM5LjA3LTIwLjcxOS0zMi41NTktMzIuNTU5LTgwLjUwOC00Mi42MjEtMTIyLjU0LTEuNzc3My03LjEwNTUtMy41NTA4LTE0LjgwMS01LjMyODEtMjEuMzEyLTIuOTYwOS0xMC42NTYtMS4xODM2LTE5LjUzNSA0LjczNDQtMjQuODYzIDMuNTUwOC0zLjU1MDggOC44Nzg5LTUuMzI4MSAxNC4yMDctNS4zMjgxIDIuMzY3MiAwIDQuMTQ0NSAwLjU5Mzc1IDYuNTExNyAxLjE4MzYgNy4xMDU1IDIuMzY3MiAxMS44NCA4LjI4OTEgMTMuNjE3IDE3LjE2OGwxMS44NCA1Mi42ODhjMC41OTM3NSAzLjU1MDggNC4xNDQ1IDYuNTExNyA3LjY5NTMgNy4xMDU1IDQuMTQ0NSAwIDcuNjk1My0xLjc3NzMgOC44Nzg5LTUuMzI4MWw0MC4yNTQtOTcuMDg2IDEuNzc3My00LjczNDQgMTkuNTM1LTQ2Ljc2NiA0LjE0NDUtMTAuMDYyIDcuNjk1My0xOC45NDFjNC4xNDQ1LTEwLjY1NiAxMS4yNDYtMTQuODAxIDE4Ljk0MS0xMS44NCA2LjUxMTcgMi4zNjcyIDExLjg0IDEwLjA2MiA4Ljg3ODkgMTcuNzU4bC0zOC40NzcgMTExLjg4LTEuNzc3MyA0LjczNDQtMS43NzczIDUuMzI4MWMtMS43NzczIDQuMTQ0NSAwLjU5Mzc1IDguODc4OSA0LjczNDQgMTEuMjQ2IDQuMTQ0NSAxLjc3NzMgOC44Nzg5IDAuNTkzNzUgMTEuMjQ2LTMuNTUwOGwyOS4wMDgtNTAuMzE2IDMuNTUwOC01LjkxOCAzNC4zNDgtNTkuMjE5IDEuNzc3My0yLjk2MDkgNi41MTE3LTEwLjY1NmMyLjM2NzItNC43MzQ0IDYuNTExNy03LjEwNTUgMTAuNjU2LTcuMTA1NSA1LjMyODEgMCAxMC42NTYgMi45NjA5IDEzLjAyMyA3LjEwNTVzMS43NzczIDguMjg5MS0wLjU5Mzc1IDEzLjAyM2wtMTcuNzU4IDMyLjU1OS0zLjU1MDggNS45MTgtNDkuMTMzIDg5Ljk4Yy0yLjM2NzIgNC4xNDQ1LTEuMTgzNiA5LjQ3MjcgMi45NjA5IDExLjg0IDQuMTQ0NSAyLjM2NzIgOC44Nzg5IDEuNzc3MyAxMS44NC0yLjM2NzJsNzEuMDM5LTkzLjUzMWM1LjkxOC03LjY5NTMgMTMuMDIzLTEwLjA2MiAxOS41MzUtNS4zMjgxIDQuNzM0NCAyLjk2MDkgNy42OTUzIDkuNDcyNyA0LjE0NDUgMTQuODAxbC03NC41OTQgMTEyLjQ3Yy0yLjM2NzIgMy41NTA4LTEuNzc3MyA4Ljg3ODkgMS4xODM2IDExLjI0NiAyLjk2MDkgMi4zNjcyIDguMjg5MSAyLjk2MDkgMTEuODQgMGw3MS4wMzktNTkuMTk5YzcuMTA1NS01LjkxOCAxMi40My00LjczNDQgMTUuOTg0LTEuMTgzNiAyLjk1NyAyLjk2NDggNC4xNDA2IDcuNjk5Mi0wLjU5NzY2IDEzLjAyN3oiLz4KIDwvZz4KPC9zdmc+Cg=="
            rootClassName={`${prefixCls}-wrapper-content-image`}
            alt=""
          />
        </div>
        <div className={`${prefixCls}-wrapper-form absolute top-12 right-2`}>
          <div className={`${prefixCls}-wrapper-form w-96`}>
            <Card
              className="w-full h-full"
              title={
                <>
                  <span className="text-2xl flex items-center justify-center">
                    {headerTitle}
                  </span>
                </>
              }
            >
              {getDifferentComponents()}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
