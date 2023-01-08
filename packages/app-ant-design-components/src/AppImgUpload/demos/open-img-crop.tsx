import { UploadFile, UploadProps } from 'antd';
import { AppImgUpload } from 'app-ant-design-components';
import React, { useState } from 'react';

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>();
  const handleFileList: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setFileList(fileList);
  };
  return (
    <AppImgUpload
      openImgCrop={false}
      fileList={fileList}
      onChange={handleFileList}
    />
  );
};
