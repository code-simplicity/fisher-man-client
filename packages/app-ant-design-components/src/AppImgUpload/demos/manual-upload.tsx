import { Upload, UploadProps } from 'antd';
import { AppImgUpload, AppSettingForm } from "app-ant-design-components";
import React from 'react';
import { RcFile } from "antd/es/upload";

// 手动上传
export default () => {

  const handleUploadFile =(file: RcFile) => {}

  /**
   * 头像上传的参数
   */
  const uploadAvatarProps: UploadProps = {
    accept: 'image/png, image/jpeg, image/jpg, image/gif',
    showUploadList: false,
    // 手动上传，上传之前的回调
    beforeUpload: (file) => {
      handleUploadFile(file);
      // 直接在这里进行接口请求就行
      return Upload.LIST_IGNORE;
    },
  };
  return (
    <>
      <AppImgUpload {...uploadAvatarProps} />
    </>
  );
};
