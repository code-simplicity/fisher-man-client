import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormListFieldData } from 'antd';
import { Tooltip } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import set from 'rc-util/lib/utils/set';
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
} from 'react';
import { useGridHelpers } from '../../AppBaseForm';
import AppSpin from '../../AppSpin';
import { AppFormListContext, AppProProvider } from '../../context';
import {
  AppProFormListItemProps,
  ChildrenItemFunction,
  IconConfig,
} from './typing';

/**
 *  Antd 自带的toArray 不支持方法，所以需要自己搞一个
 * @param children
 */
const listToArray = (children?: ReactNode | ReactNode[]) => {
  if (Array.isArray(children)) {
    return children;
  }
  if (typeof children === 'function') {
    return [children];
  }
  return toArray(children);
};

const AppProFormListItem: FC<
  AppProFormListItemProps & {
    field: FormListFieldData;
    index: number;
  }
> = (props) => {
  const {
    field,
    itemRender,
    prefixCls,
    containerClassName,
    alwaysShowItemLabel,
    containerStyle,
    index,
    formInstance,
    originName,
    meta,
    fields,
    action,
    actionRender,
    copyIconProps,
    max,
    min,
    count,
    deleteIconProps,
    itemContainerRender,
    children,
    ...rest
  } = props;

  const { hashId } = useContext(AppProProvider);
  const { grid } = useGridHelpers();
  const listContext = useContext(AppFormListContext);
  const [loadingCopy, setLoadingCopy] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const unmountedRef = useRef(false);

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  const options = {
    name: rest.name,
    field,
    index,
    record: formInstance?.getFieldValue?.(
      [listContext.listName, originName, field.name]
        .filter((item) => item !== undefined)
        .flat(1),
    ),
    fields,
    operation: action,
    meta,
  };
  /**
   * 复制图标
   */
  const copyIcon = useMemo(() => {
    /** 复制按钮的配置 */
    if (copyIconProps === false || max === count) return null;
    const { Icon = CopyOutlined, tooltipText } = copyIconProps as IconConfig;
    return (
      <Tooltip title={tooltipText} key="copy">
        <AppSpin spinning={loadingCopy}>
          <Icon
            className={`${prefixCls}-action-icon action-copy ${hashId}`}
            onClick={async () => {
              setLoadingCopy(true);
              const row = formInstance?.getFieldValue(
                [listContext.listName, originName, field.name]
                  .filter((item) => item !== undefined)
                  .flat(1),
              );
              await action.add(row);
              setLoadingCopy(false);
            }}
          />
        </AppSpin>
      </Tooltip>
    );
  }, [
    copyIconProps,
    max,
    count,
    loadingCopy,
    prefixCls,
    hashId,
    formInstance,
    listContext.listName,
    field.name,
    originName,
    action,
  ]);

  const deleteIcon = useMemo(() => {
    if (deleteIconProps === false || min === count) return null;
    const { Icon = DeleteOutlined, tooltipText } = deleteIconProps!;
    return (
      <Tooltip title={tooltipText} key="delete">
        <AppSpin spinning={loadingRemove}>
          <Icon
            className={`${prefixCls}-action-icon action-remove ${hashId}`}
            onClick={async () => {
              setLoadingRemove(true);
              await action.remove(field.name);
              if (!unmountedRef.current) {
                setLoadingRemove(false);
              }
            }}
          />
        </AppSpin>
      </Tooltip>
    );
  }, [
    deleteIconProps,
    min,
    count,
    loadingRemove,
    prefixCls,
    hashId,
    action,
    field.name,
  ]);

  const defaultActionDom: React.ReactNode[] = useMemo(
    () =>
      [copyIcon, deleteIcon].filter(
        (item) => item !== null && item !== undefined,
      ),
    [copyIcon, deleteIcon],
  );

  const actions =
    actionRender?.(field, action, defaultActionDom, count) || defaultActionDom;

  const dom =
    actions.length > 0 ? (
      <div className={`${prefixCls}-action ${hashId}`}>{actions}</div>
    ) : null;

  const getCurrentRowData = () => {
    return formInstance.getFieldValue(
      [listContext.listName, originName, index?.toString()]
        .flat(1)
        .filter((item) => item !== null && item !== undefined),
    );
  };

  const formListAction = {
    getCurrentRowData,
    setCurrentRowData: (data: Record<string, any>) => {
      const oldTableDate = formInstance?.getFieldsValue?.() || {};
      const rowKeyName = [listContext.listName, originName, index?.toString()]
        .flat(1)
        .filter((item) => item !== null && item !== undefined);
      const updateValues = set(oldTableDate, rowKeyName, {
        // 只是简单的覆盖，如果很复杂的话，需要自己处理
        ...getCurrentRowData(),
        ...(data || {}),
      });
      return formInstance.setFieldsValue(updateValues);
    },
  };

  const childrenArray = listToArray(children as React.ReactNode)
    .map((childrenItem) => {
      if (typeof childrenItem === 'function') {
        return (childrenItem as ChildrenItemFunction)?.(
          field,
          index,
          {
            ...action,
            ...formListAction,
          },
          count,
        );
      }
      return childrenItem;
    })
    .map((childrenItem, itemIndex) => {
      if (React.isValidElement(childrenItem)) {
        return React.cloneElement(childrenItem, {
          key: childrenItem.key || childrenItem?.props?.name || itemIndex,
          ...(childrenItem?.props || {}),
        });
      }
      return childrenItem;
    });

  const itemContainer =
    itemContainerRender?.(childrenArray, options) || childrenArray;

  const contentDom = itemRender?.(
    {
      listDom: (
        <div
          className={`${prefixCls}-container ${containerClassName} ${hashId}`}
          style={{
            width: grid ? '100%' : undefined,
            ...containerStyle,
          }}
        >
          {itemContainer}
        </div>
      ),
      action: dom,
    },
    options,
  ) || (
    <div
      className={`${prefixCls}-item ${hashId} ${
        alwaysShowItemLabel ? `${prefixCls}-item-show-label` : ''
      }`}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        className={`${prefixCls}-container ${containerClassName} ${hashId}`}
        style={{
          width: grid ? '100%' : undefined,
          ...containerStyle,
        }}
      ></div>
    </div>
  );

  return (
    <AppFormListContext.Provider
      value={{
        ...field,
        listName: [],
      }}
    >
      {contentDom}
    </AppFormListContext.Provider>
  );
};

export { AppProFormListItem };
