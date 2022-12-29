import { PreviewOpen } from '@icon-park/react';
import { Image } from 'antd';
import React, { useCallback, useState, type FC } from 'react';
import Viewer from 'react-viewer';
import { v4 as uuidv4 } from 'uuid';
import AppSvgIcon from '../AppSvgIcon';
import { IAppViewerProps } from './app-viewer';
import './index.less';
/**
 * 自定义图片预览组件，可以直接封装一个image，这样就可以实现全局的
 * 添加自定义图片容器进行展示
 * 支持单个数据的展示，支持数组展示
 * @param props
 * @constructor
 */
const AppViewer: FC<IAppViewerProps> = (props) => {
  const {
    images,
    visible,
    activeIndex,
    rootClassName,
    imageStyle,
    onViewerOpen,
    onViewerClose,
    width,
    height,
    imageShow,
  } = props;
  // 控制是否显示遮罩层，通过index下标的唯一值进行判断，本来是想通id进行判断的，发现id是随机可变的，所以导致出现一点问题，后期可能会使用另外的方法
  const [previewState, setPreview] = useState('');

  /**
   * 对不同的数据格式进行支持，单个对象数据进行数组化
   * @param images
   */
  const formattedImage = (images: IAppViewerProps['images']) => {
    let resultData = images;
    // 如果是数组，进行id的添加
    if (Array.isArray(resultData)) {
      resultData.forEach((item) => {
        item.id = uuidv4();
      });
      return resultData;
    }
    // 判断是单独的对象
    if (resultData !== null && typeof resultData === 'object') {
      resultData.id = uuidv4();
      // 进行数据组装
      return [resultData];
    }
  };

  /**
   * 鼠标进入离开的动作
   * 这里需要将原来的数据进行封装，然后判断是否能够出现预览
   */
  const handleMouse = useCallback(
    (index: string, type: boolean) => {
      // 判断是否离开
      if (!type) {
        return setPreview('');
      }
      setPreview(index);
    },
    [activeIndex],
  );

  // 鼠标移入的实现显示预览，移出去预览的效果关闭
  const MergedPreview = (item: any) => {
    // 遮罩层
    return (
      <>
        {item.index === previewState && (
          <div
            className="app-viewer-preview-mask"
            onMouseEnter={() => handleMouse(item.index, true)}
            onMouseLeave={() => handleMouse(item.index, false)}
            onClick={() =>
              onViewerOpen?.({ visible: true, activeIndex: item.index })
            }
          >
            <AppSvgIcon>
              <PreviewOpen theme="outline" size="24" />
            </AppSvgIcon>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      {imageShow &&
        formattedImage(images)?.map((item, index) => {
          return (
            <div key={item.id} className="app-viewer">
              <Image
                style={imageStyle}
                rootClassName={rootClassName}
                src={item.src}
                preview={false}
                width={width}
                height={height}
                onClick={() =>
                  onViewerOpen?.({ visible: true, activeIndex: index })
                }
                onMouseEnter={() => handleMouse(index.toString(), true)}
                onMouseLeave={() => handleMouse(index.toString(), false)}
              />
              <MergedPreview {...item} index={index.toString()} />
            </div>
          );
        })}
      <Viewer
        visible={visible}
        images={formattedImage(images)}
        activeIndex={activeIndex}
        onClose={() => onViewerClose?.({ visible: false })}
      ></Viewer>
    </>
  );
};

AppViewer.defaultProps = {
  imageShow: true,
  visible: true,
  images: [
    {
      src: 'https://bugdr-project-1305152720.cos.ap-beijing.myqcloud.com/fisher-uploads/2022-12-18/N6S6N9XZXDQKFSG46L58UK.png',
      alt: '图片',
    },
  ],
  // 显示层级
  zIndex: 1000,
};

export default AppViewer;
