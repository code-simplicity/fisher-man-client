import { Spin } from 'antd';
import React, { type FC } from 'react';
import './index.less';
import { AppSpinProps } from './typing';

/**
 * AppSpin 加载组件，属性和antd的spin一样，参考spin就行
 * 后续支持自定义svg图标，也可以实现旋转的效果
 * @param props
 * @constructor
 */
const AppSpin: FC<AppSpinProps> = (props) => {
  const { children, spinning, spinComponent, className, ...otherProps } = props;
  return (
    <>
      {spinning ? (
        <Spin {...otherProps} className={className}>
          {children}
        </Spin>
      ) : (
        <>{spinComponent}</>
      )}
    </>
  );
};

AppSpin.defaultProps = {
  // 自定义默认的加载图标
  // indicator: <Loading theme="outline" size="24" />,
  spinning: true,
};

export default AppSpin;
