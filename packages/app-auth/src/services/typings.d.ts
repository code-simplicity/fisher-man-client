declare namespace SERVICE {
  // 接口邮箱类型定义
  type EmailCodeType = {
    email: string;
  };
  type UploadAvatarType = {
    params: object;
    body: object;
    file?: File;
  };
  type RegisterUserType = {
    username: string;
    password: string;
    email: string;
    sex: string;
    sign?: string;
    avatar?: string;
    phone?: string;
  };
}
