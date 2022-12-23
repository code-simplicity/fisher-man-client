import { IAppSketchPickerProps } from './app-sketch-picker';

// 声明类型提供给外部使用
declare const IIAppSketchPicker: React.ForwardRefExoticComponent<
  IAppSketchPickerProps & React.RefAttributes<HTMLElement>
>;

export default IIAppSketchPicker;
