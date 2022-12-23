import { FormProps } from 'antd/es/form/Form';
import { FormItemProps } from 'antd/es/form/FormItem';

export interface settingFormItemListRecord extends FormItemProps {}

export interface IAppSettingFormProps extends FormProps {
  // 表单项的数据
  settingFormItemList?: settingFormItemListRecord[];
}
