---
toc: content
title: AppSpin 加载组件
order: 4
group:
  title: 通用
---

# AppSpin 加载组件

## 居中展示

<code src="./demos/basic.tsx">居中展示</code>

## API

| 参数             | 说明                                         | 类型             | 默认值    |
| ---------------- | -------------------------------------------- | ---------------- | --------- |
| delay            | 延迟显示加载效果的时间（防止闪烁）           | `number (毫秒) ` | -         |
| indicator        | 加载指示符                                   | `ReactNode`      | -         |
| size             | 组件大小，可选值为 `small` `default` `large` | `string`         | `default` |
| spinning         | 是否为加载中状态                             | `boolean`        | `true`    |
| tip              | 当作为包裹元素时，可以自定义描述文案         | `ReactNode`      | -         |
| wrapperClassName | 包装器的类属性                               | `string`         | -         |
| spinComponent    | spin 包裹的组件，提供一个占位的效果          | `ReactNode`      | -         |
| children         | 包裹的组件                                   | `ReactNode`      | -         |
