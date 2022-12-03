import Color from 'color';
import Chroma from 'chroma-js';
import { generate, presetPalettes } from '@ant-design/colors';

// TODO:继续编写颜色配置
// 配置颜色
const configurationColor = (colorStr: string) => {
  const colors = generate(colorStr);
  console.log('colors ==>', colors);
  console.log('presetPalettes ==>', presetPalettes);

  // 取不同的数组，一共有10个数组，
  // 全局主色
  const primaryColor = colors[4];
  // 错误色
  const errorColor = colors[7];
  // 警告色
  const warningColor = colors[2];
  // 成功色
  const successColor = colors[6];
  // 信息色
  const infoColor = colors[3];
  // 链接色
  const linkColor = colors[9];
  // 边框颜色
  const borderColorBase = colors[5];
  // 主色号
  const textColor = colors[9];
  // 标题色
  const headingColor = 'rgba(0, 0, 0, 0.85)';
  // 次文本颜色
  const textColorSecondary = 'rgba(0, 0, 0, 0.45);';
  return {
    primaryColor: primaryColor,
    // errorColor: errorColor,
    // warningColor: warningColor,
    // successColor: successColor,
    // infoColor: infoColor,
    // linkColor: linkColor,
    // borderColorBase: borderColorBase,
    // textColor: textColor,
    // headingColor: headingColor,
    // textColorSecondary: textColorSecondary,
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

export default configurationColor;
