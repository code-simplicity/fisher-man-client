import { request } from '@umijs/max';

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
