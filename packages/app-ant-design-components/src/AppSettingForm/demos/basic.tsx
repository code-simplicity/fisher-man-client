import { message, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import { AppSettingForm } from 'app-ant-design-components';
import React, { useState } from "react";

export default () => {

  // 是否展示上传文件
  const [showUploadList, setShowUploadList] = useState(false);

  // 控制上传，接口卸载此处就行
  const handleUploadFile = (file: RcFile) => {
    // handleUploadAvatarModel.runAsync({ file: file }).then((res) => {
    //   // 设置头像的数据
    //   registerModelForm.setFieldValue('avatar', res?.data?.url);
    // });
  };

  const handleBeforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/' ||
      file.type === 'image/jpg';
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isJpgOrPng) {
      message.error('您只能上传JPG/PNG/GIF类型的图片!');
      return false;
    }
    if (!isLt4M) {
      message.error('上传图片大小最多4MB!');
      return false;
    }
    setShowUploadList(true)
    handleUploadFile(file);
    return Upload.LIST_IGNORE;
  };

  /**
   * 自定义上传
   */
  const uploadProps: UploadProps = {
    accept: 'image/png, image/jpeg, image/jpg, image/gif',
    // 是否展示上传的列表
    showUploadList: showUploadList,
    // 手动上传，上传之前的回调
    beforeUpload: (file) => handleBeforeUpload(file),
  };

  return (
    <>
      <AppSettingForm uploadProps={uploadProps} />
    </>
  );
};
