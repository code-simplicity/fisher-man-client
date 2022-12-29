import { UploadOne } from '@icon-park/react';
import { Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile } from 'antd/es/upload';
import React, { useState, type FC } from 'react';
import AppSvgIcon from '../AppSvgIcon/index';
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

  /**
   * 改变的方法
   * @param newFileList
   */
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  /**
   * 图片预览，这里会封装一个图片图片预览的组件
   * @param file
   */
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      {openImgCrop ? (
        <ImgCrop>
          <Upload
            {...uploadProps}
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
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
          onPreview={onPreview}
        >
          <AppSvgIcon>
            <UploadOne theme="outline" size="32" />
          </AppSvgIcon>
        </Upload>
      )}
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
