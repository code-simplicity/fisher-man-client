---
toc: content
title: AppSetting设置组件
order: 2
group:
  title: 通用系统级别
---

# AppSetting设置组件

该组件实现是统一的网站小图标设置网站通用数据的封装，比如系统级别的主题色、多语言、字体大小、组件的圆角等，目前暂时支持内部组件自己维护状态，也可以通过传入组件进行渲染。

目前设计点
- 主题色可变
  - 多语言的配置
- 基于侧拉框的封装
- 基于ts进行封装

<code src="./demos/drag-and-drop.tsx">基础的网站设置组件</code>

## API参数

| 参数 | 说明 | 类型 | 默认值 |
| ---------- | -- | --- | --- |
| children | 子节点 | `ReactNode` | `()=> ReactNode` |
| toolTipTitle | 图标提示文字 | `string` | `摸鱼君-系统设置` |
| drawerOkText | 弹窗确认按钮文案 | `string` | `确认` |
| drawerCloseText | 取消按钮的文字 | `string` | `关闭` |
| colorPrimary | 主题色 | `string` | - |
| appSettingStyle | app显示的按钮图标的内联样式 | `CSSProperties` | - |
| onCloseDrawer | 关闭弹窗的方法 | `(e) => void` | - |
| onOpenDrawer | 打开弹窗的方法 | `(e) => void` | - |
| onSubmit | 表单提交的方法 | `(data: any) => void` | - |
| otherProps | 其他的props参考Drawer抽屉 | - | - |

