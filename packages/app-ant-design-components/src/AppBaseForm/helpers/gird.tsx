import { Col, Row, RowProps } from 'antd';
import React, { useContext, useMemo, type FC } from 'react';
import { GridContext } from '../context/GridContext';
import { AppProFormGridConfig } from '../typing';

/**
 * 当前helpers通用的props
 */
interface CommonProps {
  Wrapper?: FC<any>;
}

export interface GridHelpers {
  /**
   * 行的包裹内容
   */
  RowWrapper: FC<RowProps & CommonProps>;
  /**
   * 列的包裹内容
   */
  ColWrapper: FC<RowProps & CommonProps>;
  /**
   * 是否开启栅格布局
   */
  grid?: boolean;
}

/**
 * 为什么使用两个箭头函数，其实就是返回函数的函数
 * @param grid 开启栅格布局
 * @param rowProps 行
 * @param colProps 列
 */
export const gridHelpers: (
  config: AppProFormGridConfig & CommonProps,
) => GridHelpers = ({ grid, rowProps, colProps }) => {
  return {
    /**
     * 使用“！！”其实是undefined或者是null的时候，返回的是真的
     */
    grid: !!grid,
    /**
     * 行包裹
     * @param children 组件包裹内容
     * @param Wrapper 包裹
     * @param otherProps 其他props
     * @constructor
     */
    RowWrapper: ({ children, Wrapper, ...otherProps } = {}) => {
      if (!grid)
        return Wrapper ? <Wrapper>{children}</Wrapper> : (children as any);
      return (
        <Row gutter={8} {...rowProps} {...otherProps}>
          {children}
        </Row>
      );
    },
    /**
     * 列包裹
     * @param children 组件包裹内容
     * @param Wrapper 包裹
     * @param otherProps 其他props
     * @constructor
     */
    ColWrapper: ({ children, Wrapper, ...otherProps } = {}) => {
      const props = useMemo(() => {
        const originProps = { ...colProps, ...otherProps };
        /**
         * xs优先级高于span
         * 避免span失效
         */
        if (
          typeof originProps?.span === 'undefined' &&
          typeof originProps?.xs === 'undefined'
        ) {
          originProps.xs = 24;
        }
        return originProps;
      }, [otherProps]);
      if (!grid)
        return Wrapper ? <Wrapper>{children}</Wrapper> : (children as any);
      return (<Col {...props}>{children}</Col>) as any;
    },
  };
};

/**
 * 栅格布局的的助手，实现一些特定的功能的hooks
 * @param props
 */
export const useGridHelpers = (
  props?: (AppProFormGridConfig & CommonProps) | boolean,
) => {
  const config = useMemo(() => {
    {
      /**
       * 如果props是对象，返回
       */
      if (typeof props === 'object') {
        return props;
      }
      // 是字符串/undefined/null,返回
      return {
        grid: props,
      };
    }
  }, [props]);
  const { grid, colProps } = useContext(GridContext);
  return useMemo(() => {
    return gridHelpers({
      grid: !!(grid || config.grid),
      rowProps: config?.rowProps,
      colProps: config?.colProps || colProps,
      Wrapper: config?.Wrapper,
    });
  }, [
    config?.Wrapper,
    config.grid,
    grid,
    JSON.stringify([colProps, config?.colProps, config?.rowProps]),
  ]);
};
