import { useRequest } from 'ahooks';
import {
  getEmailCodeService,
  getInitAvatarService,
  registerUserService,
  uploadAvatarService,
} from '@/services/auth';
import { message } from 'antd';

export default () => {
  /**
   * 请求初始化头像
   */
  const handleInitAvatar = useRequest(getInitAvatarService);

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
  const handleRegisterUser = useRequest(registerUserService, {
    debounceWait: 300,
    manual: true,
    onSuccess: (data) => {
      message.success(data.message);
    },
  });

  // 上传头像的接口
  const handleUploadAvatarModel = useRequest(uploadAvatarService, {
    debounceWait: 200,
    manual: true,
    onSuccess: (data) => {
      message.success(data.message);
    },
  });
  return {
    handleInitAvatar,
    handleRegisterUser,
    handleSendEmailCode,
    handleUploadAvatarModel,
  };
};
