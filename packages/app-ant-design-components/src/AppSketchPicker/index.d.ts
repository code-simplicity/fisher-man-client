import { IAppSketchPickerProps } from './app-sketch-picker';

// 声明类型提供给外部使用
declare const IAppSketchPicker: React.ForwardRefExoticComponent<
  IAppSketchPickerProps & React.RefAttributes<HTMLElement>
>;

export default IAppSketchPicker;
