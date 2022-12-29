import { ImageProps } from 'rc-image/lib/Image';
import { CSSProperties } from 'react';
import ViewerProps, { ImageDecorator } from 'react-viewer/lib/ViewerProps';

export interface IAppViewerProps extends ViewerProps, ImageProps {
  // 需要进行浏览的图片地址，可以为数组对象，也可以是对象，支持这两种数据格式
  images?: ImageDecorator[] | ImageDecorator;
  // 支持图片的内联样式
  imageStyle?: CSSProperties;
  // 关闭图片预览的方法
  onViewerClose?: ({ visible: boolean, ...args }) => void;
  // 打开图片预览的方法
  onViewerOpen?: ({ visible: boolean, activeIndex: number, ...args }) => void;
}
