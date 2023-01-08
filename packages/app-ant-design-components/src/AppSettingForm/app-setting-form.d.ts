import { CheckboxOptionType } from 'antd/es/checkbox/Group';
import { FormProps } from 'antd/es/form/Form';
import { FormItemProps } from 'antd/es/form/FormItem';
import { RadioGroupProps } from 'antd/es/radio/interface';
import { UploadProps } from "antd";

export interface settingFormItemListRecord extends FormItemProps {}

export interface IAppSettingFormProps extends FormProps {
  // 支持语言的配置数据
  supportLanguageOptions?: Array<CheckboxOptionType | string | number>;
  languageOptions?: Array<CheckboxOptionType | string | number>;
  // 顶部导航栏的配置
  navigationBarPreferencesProps?: RadioGroupProps;
  // 顶部导航栏的配置数据
  navigationBarPreferencesOptions?: Array<CheckboxOptionType | string | number>;
  settingFormItemList?: settingFormItemListRecord[];
  // 上传文件的参数
  uploadProps?: UploadProps
}
