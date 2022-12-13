import { request } from '@umijs/max';

/**
 * 登陆接口
 * @param data
 */
export const login = async (data: SERVICE.LoginType) => {
  return request('/ucenter/user/login', {
    method: 'POST',
    data: data,
  });
};

/**
 * 获取邮箱验证码
 * @param params
 */
export const getEmailCodeService = async (params: SERVICE.EmailCodeType) => {
  return request('/ucenter/send/email/code', {
    method: 'GET',
    params,
  });
};

export const getInitAvatar = () => {
  return request('/ucenter/user/init/avatar', {
    method: 'GET',
  });
};

/**
 * 注册用户
 * @param data
 */
export const registerUser = (data: SERVICE.RegisterUserType) => {
  return request('/ucenter/user/register', {
    method: 'POST',
    data: data,
  });
};

/**
 * 上传头像
 * @param params
 * @param body
 * @param file
 */
export const uploadAvatarService = async ({
  params,
  body,
  file,
}: SERVICE.UploadAvatarType) => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  return request('/upload/file', {
    method: 'POST',
    data: formData,
    requestType: 'form',
  });
};

/**
 * 获取图灵验证码
 */
export const getVerifyCode = () => {
  return request('/ucenter/verify/code', {
    method: 'GET',
  });
};
