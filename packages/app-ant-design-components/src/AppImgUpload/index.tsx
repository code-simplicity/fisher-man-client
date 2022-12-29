import { UploadOne } from '@icon-park/react';
import { Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';
import React, { useState, type FC } from 'react';
import AppSvgIcon from '../AppSvgIcon/index';
import AppViewer from '../AppViewer';
import { ImageDecoratorProps } from '../AppViewer/app-viewer';
import { IAppImgUploadProps } from './app-img-upload';

/**
 * 封装的图片上传组件，具体参数可以参考到props
 * @constructor
 */
const AppImgUpload: FC<IAppImgUploadProps> = (props) => {
  const { openImgCrop, imgCropProps, uploadProps } = props;
  /**
   * 上传文件的列表
   */
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  // 预览图片的数据封装
  const [previewImage, setPreviewImage] = useState<
    ImageDecoratorProps[] | ImageDecoratorProps
  >({
    src: '',
  });
  const [viewerState, setViewer] = useState({ visible: false, activeIndex: 0 });

  /**
   * 改变的方法
   * @param newFileList
   */
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  /**
   * 图片预览，这里会封装一个图片图片预览的组件
   * 使用该预览组件即可预览数据，这里推荐使用数据的方式进行数据的统一封装触发，通过list数据，不过目前看来单个的设置也还不错，这样也可以实现
   * @param file
   */
  const handlePreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    // 设置图片的预览
    setPreviewImage({ src: src });
    // 图片预览的状态改变
    setViewer({ ...viewerState, visible: true, activeIndex: 1 });
  };

  // 打开预览
  const handleViewerOpen = ({
    visible,
    activeIndex,
  }: {
    visible: boolean;
    activeIndex: number;
  }) => {
    setViewer({ ...viewerState, visible: visible, activeIndex: activeIndex });
  };

  // 关闭预览
  const handleViewClose = ({ visible }: { visible: boolean }) => {
    setViewer({ ...viewerState, visible: visible });
  };

  return (
    <>
      {openImgCrop ? (
        <ImgCrop>
          <Upload
            {...uploadProps}
            fileList={fileList}
            onChange={onChange}
            onPreview={handlePreview}
          >
            <AppSvgIcon>
              <UploadOne theme="outline" size="32" />
            </AppSvgIcon>
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          {...uploadProps}
          fileList={fileList}
          onChange={onChange}
          onPreview={handlePreview}
        >
          <AppSvgIcon>
            <UploadOne theme="outline" size="32" />
          </AppSvgIcon>
        </Upload>
      )}
      <AppViewer
        imageShow={false}
        images={previewImage}
        visible={viewerState.visible}
        onViewerOpen={handleViewerOpen}
        onViewerClose={handleViewClose}
      />
    </>
  );
};

AppImgUpload.defaultProps = {
  // 开启图片剪切
  openImgCrop: true,
  // 剪切配置
  imgCropProps: {
    rotate: true,
    zoom: true,
    modalTitle: '图片剪切',
    modalWidth: '20vw',
  },
  uploadProps: {
    name: 'file',
    listType: 'picture-card',
    maxCount: 1,
  },
};

export default AppImgUpload;
