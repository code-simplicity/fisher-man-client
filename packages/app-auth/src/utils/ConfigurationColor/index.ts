import Color from 'color';
import Chroma from 'chroma-js';
import { generate, presetPalettes } from '@ant-design/colors';

// 配置颜色
const configurationColor = (colorStr: string) => {
  const colors = generate(colorStr);
  console.log('colors ==>', colors);
  console.log('presetPalettes ==>', presetPalettes);
  // 计算老的数据

  // const chromaScale = Chroma.scale([colorStr, computerColor.hex()]);
  // 主颜色

  const primaryColor = colors[9];
  const errorColor = colors[5];
  const warningColor = colors[7];
  const successColor = colors[6];
  const infoColor = colors[5];
  return {
    primaryColor: primaryColor,
    errorColor: errorColor,
    warningColor: warningColor,
    successColor: successColor,
    infoColor: infoColor,
  };
};

// 传入不同的透明度实现颜色的转换
const colorPalette = (colorStr: string, opacity: number, type: string) => {
  const chromaScale = Chroma.scale([colorStr]);
  let colorState;
  // 判断是哪一种类型的颜色，这里主要分为五种
  switch (type) {
    case 'primary':
      colorState = chromaScale(opacity).hex();
      break;
    case 'error':
      colorState = chromaScale(opacity).hex();
      break;
    case 'warning':
      colorState = chromaScale(opacity).hex();
      break;
    case 'success':
      colorState = chromaScale(opacity).hex();
      break;
    case 'info':
      colorState = chromaScale(opacity).hex();
      break;
  }
  return colorState;
};

// 颜色规则的转换

export default configurationColor;
