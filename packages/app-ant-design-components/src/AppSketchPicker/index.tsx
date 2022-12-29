import { Popover, Tag } from 'antd';
import React, { useCallback, useState, type FC } from 'react';
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
  // 组件自己维护自己的状态和数据，这个就不抽出来，后续的回调就添加数据就行
  const [colorState, handleUpdateColor] = useState(color);
  /**
   *  颜色更改的回调
   * @param color string
   */
  const handleOnChange = useCallback(
    (color: string) => {
      handleUpdateColor(color);
      // 回调改变的参数
      onChange(color);
    },
    [color],
  );
  return (
    <>
      <Popover
        content={
          <SketchPicker
            color={colorState}
            onChange={({ hex }) => handleOnChange(hex)}
          />
        }
      >
        <Tag color={colorState}>{colorState}</Tag>
      </Popover>
    </>
  );
};

export default AppSketchPicker;
