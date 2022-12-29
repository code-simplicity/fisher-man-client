---
toc: content
title: AppViewer 图片预览组件
order: 5
group:
  title: 通用
---

# AppViewer 图片预览组件

该组件采用的是 antd 的 image 组件加上[react-viewer](https://github.com/infeng/react-viewer) 组件封装而成。

## 居中展示

<code src="./demos/basic.tsx">单张图片展示</code>

## API

| 参数          | 说明                             | 类型                                                           | 默认值 |
| ------------- | -------------------------------- | -------------------------------------------------------------- | ------ |
| images        | 图片列表                         | `ImageDecorator[] \| ImageDecorator`                           | -      |
| imageStyle    | 图片的内联样式                   | `ReactNode`                                                    | -      |
| onViewerClose | 图片预览关闭方法                 | `({ visible: boolean, ...args }) => void`                      | -      |
| onViewerOpen  | 图片预览打开方法                 | `({ visible: boolean, activeIndex: number, ...args }) => void` | -      |
| ViewerProps   | 预览工具的参数，详细参数如下所示 | -                                                              | -      |

### ViewerProps 参数

为了方便查看，将原来的[react-viewer](https://github.com/infeng/react-viewer)的文档的参数写在了我的文档中，建议可以直接查看该项目地址，这里其他内置的属性不在去配置了，直接阅读原文档吧。

| 参数                      | 说明                                        | 类型                                                   | 默认值 |
| ------------------------- | ------------------------------------------- | ------------------------------------------------------ | ------ |
| visible                   | viewer 是否可见                             | `boolean`                                              | -      |
| onClose                   | 点击关闭按钮的回调                          | `() => void`                                           | -      |
| images                    | 需要进行浏览的图片地址集合                  | ImageDecorator[]                                       | -      |
| activeIndex               | 当前图像 index                              | `number`                                               | -      |
| zIndex                    | 自定义 viewer 组件的 z-index                | `number`                                               | -      |
| container                 | viewer 渲染的父节点，设置后开启 inline mode | `HTMLElement`                                          | -      |
| drag                      | 图片是否可拖动                              | `boolean`                                              | -      |
| attribute                 | 是否显示图片属性                            | `boolean`                                              | -      |
| zoomable                  | 是否显示缩放按钮                            | `boolean`                                              | -      |
| rotatable                 | 是否显示旋转按钮                            | `boolean`                                              | -      |
| scalable                  | 是否显示变换按钮                            | `boolean`                                              | -      |
| onMaskClick               | callback function when mask is clicked      | `(e: React.MouseEvent<HTMLDivElement>) => void`        | -      |
| downloadable              | 是否显示下载按钮                            | `boolean`                                              | -      |
| loop                      | 图片是否可循环                              | `boolean`                                              | -      |
| noClose                   | 是否显示关闭按钮                            | `boolean`                                              | -      |
| noImgDetails              | 不显示图片详情                              | `boolean`                                              | -      |
| noNavbar                  | 不显示侧边工具栏                            | `boolean`                                              | -      |
| noToolbar                 | 不显示工具栏                                | `boolean`                                              | -      |
| noFooter                  | 不呈现整个页脚                              | `boolean`                                              | -      |
| changeable                | 是否显示更改按钮                            | `boolean`                                              | -      |
| customToolbar             | 自定义工具栏                                | `(toolbars: ToolbarConfig[]) => ToolbarConfig[]`       | -      |
| zoomSpeed                 | 缩放速度                                    | `number`                                               | -      |
| defaultSize               | 默认大小                                    | `ViewerImageSize`                                      | -      |
| defaultImg                | 如果加载 img 失败，显示默认 img             | `ViewerDefaultImg`                                     | -      |
| disableKeyboardSupport    | 禁用键盘支持                                | `boolean`                                              | -      |
| noResetZoomAfterChange    | 图像更改后保持缩放                          | `boolean`                                              | -      |
| noLimitInitializationSize | 没有限制图像初始化大小                      | `boolean`                                              | -      |
| defaultScale              | 图片默认缩放比例                            | `number`                                               | -      |
| onChange                  | 图片改变时回调                              | `(activeImage: ImageDecorator, index: number) => void` | -      |
| disableMouseZoom          | 是否禁用鼠标缩放                            | `boolean`                                              | -      |
| downloadInNewWindow       | 是否在新窗口下载                            | `boolean`                                              | -      |
| className                 | 自定义 css                                  | `string`                                               | -      |
| showTotal                 | 是否显示总数和范围                          | `boolean`                                              | -      |
| maxScale                  | 最大缩放比例                                | `number`                                               | -      |
| minScale                  | 最小缩放比例                                | `number`                                               | -      |

### ImageProps

直接可以参考 antd 的，不过我还是将 antd 的文档拿过来用了。

| 参数          | 说明                                                   | 类型                                   | 默认值 | 版本                                    |
| ------------- | ------------------------------------------------------ | -------------------------------------- | ------ | --------------------------------------- |
| alt           | 图像描述                                               | string                                 | -      | 4.6.0                                   |
| fallback      | 加载失败容错地址                                       | string                                 | -      | 4.6.0                                   |
| height        | 图像高度                                               | string \| number                       | -      | 4.6.0                                   |
| placeholder   | 加载占位, 为 `true` 时使用默认占位                     | ReactNode                              | -      | 4.6.0                                   |
| preview       | 预览参数，为 `false` 时禁用                            | boolean \| [previewType](#previewtype) | true   | 4.6.0 [previewType](#previewtype):4.7.0 |
| src           | 图片地址                                               | string                                 | -      | 4.6.0                                   |
| width         | 图像宽度                                               | string \| number                       | -      | 4.6.0                                   |
| onError       | 加载错误回调                                           | (event: Event) => void                 | -      | 4.12.0                                  |
| rootClassName | 为展示图片根 DOM 和预览大图根 DOM 提供自定义 className | string                                 | -      | 4.20.0                                  |
