import { Form, Input } from 'antd';
import React, { type FC } from 'react';
import { IAppSettingFormProps } from './app-setting-form';

const { Item } = Form;

/**
 * 设置组件的表单配置
 * 该组件是一个业务组件，服务于业务的，但是可以拓展，提供了数据的渲染子节点表单的方式， settingFormItemList就是实现这样的功能，当然也可以使用children
 * @param props IAppSettingFormProps
 * @constructor
 */
const AppSettingForm: FC<IAppSettingFormProps> = (props) => {
  const { layout, settingFormItemList, children, ...otherProps } = props;
  return (
    <>
      <Form {...otherProps} layout={layout}>
        <>
          {settingFormItemList?.map((item) => {
            return (
              <Item key={item.id} name={item.name} label={item.label}>
                {item.children}
              </Item>
            );
          })}
          {children}
        </>
      </Form>
    </>
  );
};

AppSettingForm.defaultProps = {
  // 默认取消冒号
  colon: false,
  // 表单名称
  name: 'appSettingForm',
  // 标签的布局
  labelCol: { span: 8 },
  // 设置控件布局
  wrapperCol: { span: 16, offset: 2 },
  // 标签对其方式
  labelAlign: 'left',
  // 表单项的配置，推荐使用
  settingFormItemList: [
    {
      id: 'setting-title',
      name: 'settingTitle',
      label: '系统标题',
      children: <Input placeholder="请输入系统标题" />,
    },
    {
      id: 'setting-icon',
      name: 'settingIcon',
      label: '系统图标',
      children: <Input placeholder="请输入系统标题" />,
    },
    {
      id: 'setting-support-language',
      name: 'supportLanguage',
      label: '系统支持语言',
      children: <Input placeholder="请输入系统标题" />,
    },
    {
      id: 'setting-theme-color',
      name: 'themeColor',
      label: '系统主题色',
      children: <Input placeholder="请输入系统标题" />,
    },
    {
      id: 'setting-navigation-bar-preferences',
      name: 'navigationBarPreferences',
      label: '顶部导航栏偏好设置',
      children: <Input placeholder="请输入系统标题" />,
    },
    {
      id: 'setting--sidebar-preferences',
      name: 'sidebarPreferences',
      label: '侧边导航栏偏好设置',
      children: <Input placeholder="请输入系统标题" />,
    },
  ],
};

export default AppSettingForm;
