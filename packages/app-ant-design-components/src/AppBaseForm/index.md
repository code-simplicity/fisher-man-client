---
toc: content
title: AppBaseForm基础表单
order: 6
group:
  title: 通用
---

# AppProForm 组件

## 基本介绍

基础表单是通过二次开发 antd 的**Form**组件开发。

## 例子

### 基本使用

<code src="./demos/base.tsx">基本表单使用</code>

<code src="./demos/drawer-form.tsx">基础的弹窗表单</code>

## AppProForm APi

AppProForm 是参考 `pro-components` 进行封装的，其实就是感觉他的组件库设计确实是很好的。 和 `antd Form` 开发模式一样，可以继续使用 `FormItem` 进行开发，基本上都直接可以参考 `Form` 表单的开发模式。

| 参数     | 说明   | 类型        | 默认值           |
| -------- | ------ | ----------- | ---------------- |
| children | 子节点 | `ReactNode` | `()=> ReactNode` |
