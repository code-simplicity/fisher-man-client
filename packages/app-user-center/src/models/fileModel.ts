import { useRequest } from 'ahooks';

import { message } from 'antd';
import { uploadFile } from '@/services/file';

export default () => {
  // 文件上传的接口
  const handleUploadFileModel = useRequest(uploadFile, {
    debounceWait: 200,
    manual: true,
    onSuccess: (data) => {
      message.success(data.message);
    },
  });
  return {
    handleUploadFileModel,
  };
};
