import { injectIntl } from '@@/plugin-locale';
import { ComponentsProps } from '../../type';
import { FC, MouseEventHandler, useLayoutEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import configurationColor from '../../utils/ConfigurationColor/index';
import { ConfigProvider, Popover } from 'antd';
import './index.less';

interface AppSketchPickerProps extends ComponentsProps {
  colorPrimary?: string;
  onChangeColor?: any;
}

const prefixCls = 'app-sketch-picker';

// 颜色选择器
const AppSketchPicker: FC<AppSketchPickerProps> = ({
  intl,
  colorPrimary,
  onChangeColor,
}) => {
  // 改变颜色
  const onColorChange = (nextColor: string) => {
    const colors = configurationColor(nextColor);
    // 设置颜色
    onChangeColor(nextColor);
    // 全局设置颜色
  };
  return (
    <div className={`${prefixCls}`}>
      <Popover
        content={
          <SketchPicker
            color={colorPrimary}
            onChange={({ hex }) => {
              onColorChange(hex);
            }}
          />
        }
      >
        <div className={`${prefixCls}-palette`}>
          <div
            className={`${prefixCls}-palette-color`}
            style={{
              backgroundColor: colorPrimary,
            }}
          >
            {colorPrimary}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default injectIntl(AppSketchPicker);
