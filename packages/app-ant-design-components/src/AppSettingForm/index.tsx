import { Checkbox, Form, Input, message, Radio, UploadFile, UploadProps } from "antd";
import React, { type FC } from 'react';
import AppImgUpload from '../AppImgUpload';
import AppSketchPicker from '../AppSketchPicker/index';
import { IAppSettingFormProps } from './app-setting-form';
import { RcFile, UploadChangeParam } from "antd/es/upload";

const { Item } = Form;

/**
 * 设置组件的表单配置
 * 该组件是一个业务组件，服务于业务的，但是可以拓展，提供了数据的渲染子节点表单的方式， settingFormItemList就是实现这样的功能，当然也可以使用children
 * @param props IAppSettingFormProps
 * @constructor
 */
const AppSettingForm: FC<IAppSettingFormProps> = (props) => {
  const {
    layout,
    settingFormItemList,
    supportLanguageOptions,
    navigationBarPreferencesOptions,
    navigationBarPreferencesProps,
    languageOptions,
    form,
    uploadProps,
    children,
    ...otherProps
  } = props;
  const handleColorChange = (color: string) => {
    form?.setFieldValue('systemThemeColor', color);
  };

  return (
    <>
      <Form {...otherProps} form={form} layout={layout}>
        <Item name="systemTitle" label="系统标题">
          <Input placeholder="请输入系统标题" />
        </Item>
        <Item name="systemIcon" label="系统图标">
          <AppImgUpload listType="picture-card" maxCount={1} {...uploadProps}></AppImgUpload>
        </Item>
        <Item name="systemSupportLanguage" label="系统支持语言">
          <Checkbox.Group
            options={supportLanguageOptions}
            defaultValue={['zh-CN']}
          ></Checkbox.Group>
        </Item>
        <Item name="systemLanguage" label="系统默认语言">
          <Radio.Group
            options={languageOptions}
            defaultValue={'zh-CN'}
          ></Radio.Group>
        </Item>
        <Item name="systemThemeColor" label="系统主题色">
          <AppSketchPicker
            color={form?.getFieldValue('systemThemeColor')}
            onChange={handleColorChange}
          />
        </Item>
        <Item name="systemNavigationBarPreferences" label="顶部导航栏偏好设置">
          <Radio.Group
            {...navigationBarPreferencesProps}
            options={navigationBarPreferencesOptions}
          ></Radio.Group>
        </Item>
        <Item name="systemSidebarPreferences" label="侧边导航栏偏好设置">
          <Radio.Group
            {...navigationBarPreferencesProps}
            options={navigationBarPreferencesOptions}
          ></Radio.Group>
        </Item>
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
  // 系统支持语言配置
  supportLanguageOptions: [
    {
      label: '简体中文',
      value: 'zh-CN',
    },
    {
      label: '繁体中文',
      value: 'zh-TW',
    },
    {
      label: 'English',
      value: 'en-US',
    },
  ],
  // 系统语言配置
  languageOptions: [
    {
      label: '简体中文',
      value: 'zh-CN',
    },
    {
      label: '繁体中文',
      value: 'zh-TW',
    },
    {
      label: 'English',
      value: 'en-US',
    },
  ],
  // 顶部导航栏配置
  navigationBarPreferencesProps: {
    buttonStyle: 'solid',
    optionType: 'button',
    size: 'middle',
  },
  // 顶部导航栏配置数据
  navigationBarPreferencesOptions: [
    {
      label: '默认',
      value: 'defaultColor',
    },
    {
      label: '主题色',
      value: 'primaryColor',
    },
    {
      label: '深色',
      value: 'darkColor',
    },
    {
      label: '浅色',
      value: 'lightColor',
    },
  ],
  // 表单项的配置，推荐使用
  settingFormItemList: [],
};

export default AppSettingForm;
