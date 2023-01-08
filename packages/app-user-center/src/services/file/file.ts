import { request } from '@umijs/max';

/**
 * 上传文件的接口
 * @param params
 * @param file
 */
export const uploadFile = async ({ params, file }: FileApi.UploadFileReq) => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  return request<FileApi.UploadFileRes>('/upload/file', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    params,
  });
};
