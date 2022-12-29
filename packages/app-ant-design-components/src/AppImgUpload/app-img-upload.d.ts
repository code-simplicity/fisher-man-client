import { UploadProps } from 'antd';
import { ImgCropProps } from 'antd-img-crop';

export interface IAppImgUploadProps {
  // 是否开启图片剪切
  openImgCrop?: boolean;
  // 图片剪切配置，排除children，因为这个属性是必填，其实这个就没写好，哈哈哈
  imgCropProps?: Omit<ImgCropProps, 'children'>;
  // 上传的配置，可以参考antd
  uploadProps?: UploadProps;
}
