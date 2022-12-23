import { Popover, Tag } from 'antd';
import React, { type FC } from 'react';
import { SketchPicker } from 'react-color';
import { IAppSketchPickerProps } from './app-sketch-picker';

/**
 * 颜色拾取器组件
 * 目前就暂时支持内部写死的组件，后续需要更改之后再做操作
 * @param props
 * @constructor
 */
const AppSketchPicker: FC<IAppSketchPickerProps> = (props) => {
  const { color, onChange } = props;
  /**
   *  颜色更改的回调
   * @param color string
   */
  const handleOnChange = (color: string) => {
    onChange(color);
  };
  return (
    <>
      <Popover
        content={
          <SketchPicker
            color={color}
            onChange={({ hex }) => handleOnChange(hex)}
          />
        }
      >
        <Tag color={color}>{color}</Tag>
      </Popover>
    </>
  );
};

export default AppSketchPicker;
