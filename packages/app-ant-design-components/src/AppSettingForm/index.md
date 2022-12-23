---
toc: content
title: AppSettingForm 表单设置
order: 2
group:
  title: 通用系统级别
---

# AppSettingForm 表单设置

## 基本例子

<code src="./demos/basic.tsx">基础的设置表单</code>

## API

| 参数                      | 说明                              | 类型                          | 默认值 |
| ------------------------- | --------------------------------- | ----------------------------- | ------ |
| settingFormItemListRecord | 与 antd 的 FormItemProps 保持一致 | `FormItemProps`               | -      |
| settingFormItemList       | 表单项的数据                      | `settingFormItemListRecord[]` | -      |

## settingFormItemList 的基本数据格式

```js
// 表单项的配置，推荐使用
settingFormItemList: [
  {
    id: 'setting-title',
    name: 'settingTitle',
    label: '系统标题',
    children: 'null',
  },
  {
    id: 'setting-icon',
    name: 'settingIcon',
    label: '系统图标',
    children: 'null',
  },
  {
    id: 'setting-support-language',
    name: 'supportLanguage',
    label: '系统支持语言',
    children: 'null',
  },
  {
    id: 'setting-theme-color',
    name: 'themeColor',
    label: '系统主题色',
    children: 'null',
  },
  {
    id: 'setting-navigation-bar-preferences',
    name: 'navigationBarPreferences',
    label: '顶部导航栏偏好设置',
    children: 'null',
  },
  {
    id: 'setting--sidebar-preferences',
    name: 'sidebarPreferences',
    label: '侧边导航栏偏好设置',
    children: 'null',
  },
];
```
