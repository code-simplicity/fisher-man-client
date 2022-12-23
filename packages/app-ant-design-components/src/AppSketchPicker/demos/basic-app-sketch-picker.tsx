import React, { useState } from 'react';
import AppSketchPicker from '../../AppSketchPicker/index';

export default () => {
  // 组件自己维护自己的状态和数据，这个就不抽出来，后续的回调就添加数据就行
  const [color, handleUpdateColor] = useState('#434534');
  const handleOnChangeColor = (color: string) => {
    handleUpdateColor(color);
  };
  return <AppSketchPicker onChange={handleOnChangeColor} color={color} />;
};
