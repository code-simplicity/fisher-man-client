import { injectIntl } from '@@/plugin-locale';
import { ComponentsProps } from '@/pages/Login/interface';
import { FC, useLayoutEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import configurationColor from '@/utils/ConfigurationColor';
import { ConfigProvider } from 'antd';
import './index.less';

interface AppSketchPickerProps extends ComponentsProps {}

const prefixCls = 'app-sketch-picker';

// 颜色选择器
const AppSketchPicker: FC<AppSketchPickerProps> = ({ intl }) => {
  const [color, setColor] = useState({
    primaryColor: '#ff6f00',
  });
  // 颜色盘是否显示
  const [paletteState, setPaletteState] = useState(false);

  // 编译的时候运行
  useLayoutEffect(() => {
    onColorChange('#ff6f00');
  }, []);

  // 拾取颜色
  const handlePalette = () => {
    setPaletteState(!paletteState);
  };

  // 关闭拾取盘（按任意地方）
  const handlePaletteClose = () => {
    setPaletteState(false);
  };

  // 改变颜色
  const onColorChange = (nextColor: string) => {
    const colors = configurationColor(nextColor);
    // 设置颜色
    setColor({ primaryColor: nextColor });
    // 全局设置颜色
    ConfigProvider.config({
      theme: colors,
    });
  };
  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-palette`} onClick={handlePalette}>
        <div
          className={`${prefixCls}-palette-color`}
          style={{
            backgroundColor: color.primaryColor,
          }}
        >
          {color.primaryColor}
        </div>
      </div>
      <div className={`${prefixCls}-content`}>
        {paletteState ? (
          <>
            <div
              className={`${prefixCls}-content-mask`}
              onClick={handlePaletteClose}
            />
            <div className={`${prefixCls}-content-pick`}>
              <SketchPicker
                color={color.primaryColor}
                presetColors={['#1890ff', '#25b864', '#ff6f00']}
                onChange={({ hex }) => {
                  onColorChange(hex);
                }}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default injectIntl(AppSketchPicker);
