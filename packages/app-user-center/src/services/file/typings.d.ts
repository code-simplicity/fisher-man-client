declare namespace FileApi {
  // 文件上传的请求参数
  interface UploadFileReq {
    // post穿params
    params?: { [key: string]: any };
    // post传body
    data?: { [key: string]: any };
    // 上传文件
    file: File;
  }

  // 文件返回的值
  interface UploadFileRes {
    message: any;
    data: any;
  }
}
