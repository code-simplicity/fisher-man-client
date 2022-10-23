import Color from 'color';

// 配置颜色
const configurationColor = (colorStr: string) => {
  // 主颜色
  const primaryColor = colorPalette(colorStr, 0, 'primary');
  const errorColor = colorPalette(colorStr, 0.15, 'error');
  const warningColor = colorPalette(colorStr, 0.2, 'warning');
  const successColor = colorPalette(colorStr, 0.3, 'success');
  const infoColor = colorPalette(colorStr, 0.4, 'info');
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
  const color = Color(colorStr).alpha(opacity);
  console.log('color ==>', color);
  // 判断是哪一种类型的颜色，这里主要分为五种
  switch (type) {
    case 'primary':
      color.hex();
      break;
    case 'error':
      color.hex();
      break;
    case 'warning':
      color.hex();
      break;
    case 'success':
      color.hex();
      break;
    case 'info':
      color.hex();
      break;
  }
  return color.hex();
};

// 颜色规则的转换

export default configurationColor;
