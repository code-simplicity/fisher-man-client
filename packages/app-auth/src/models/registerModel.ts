import { useRequest } from 'ahooks';
import {
  getEmailCodeService,
  getInitAvatar,
  registerUser,
} from '@/services/auth';
import { message } from 'antd';

export default () => {
  /**
   * 请求初始化头像
   */
  const handleInitAvatar = useRequest(() => {
    return getInitAvatar();
  });

  // 用户注册置空
  const clearRegisterUserState = () => {
    return {
      username: '',
      password: '',
      email: '',
      sex: '',
      phone: '',
      avatar: '',
    };
  };

  /**
   * 发送邮箱验证码接口请求
   */
  const handleSendEmailCode = useRequest(getEmailCodeService, {
    debounceWait: 300,
    manual: true,
  });

  // 注册接口的调用
  const handleRegisterUser = useRequest(registerUser, {
    debounceWait: 300,
    manual: true,
    onSuccess: (data) => {
      message.success(data.message);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  return {
    handleInitAvatar,
    handleRegisterUser,
    handleSendEmailCode,
  };
};
