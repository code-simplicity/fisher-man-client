import { useRequest } from 'ahooks';
import { updateUserPasswordService } from '@/services/auth';
import { message } from 'antd';

export default () => {
  /**
   * 忘记密码
   */
  const handleForgetPasswordModel = useRequest(updateUserPasswordService, {
    debounceWait: 300,
    manual: true,
    onSuccess: (data) => {
      message.success(data.message);
    },
  });
  return {
    handleForgetPasswordModel,
  };
};
