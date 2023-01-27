import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import omit from 'omit.js';
import React, {
  CSSProperties,
  FC,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { v4 as uuidV4 } from 'uuid';
import { AppProProvider } from '../../context';
import { useIntl } from '../../hooks';
import { runFunction } from '../../utils';
import { AppProFormListItem } from './ListItem';
import { AppProFormListItemProps } from './typing';

const AppProFormListContainer: FC<AppProFormListItemProps> = (props) => {
  const {
    fields,
    children,
    actionRender,
    action,
    actionGuard,
    onAfterAdd,
    onAfterRemove,
    prefixCls,
    creatorButtonProps,
    creatorRecord,
    max,
    meta,
    containerClassName,
    containerStyle,
    fieldExtraRender,
  } = props;
  const intl = useIntl();
  const { hashId } = useContext(AppProProvider);
  const fieldKeyMap = useRef(new Map<string, string>());
  const [loading, setLoading] = useState(false);

  const defaultStyle: CSSProperties = {
    width: 'max-content',
    maxWidth: '100%',
    minWidth: '100%',
    ...containerStyle,
  };
  /**
   * 获取字段
   */
  const uuidFields = useMemo(() => {
    return fields.map((field) => {
      if (!fieldKeyMap.current.has(field.key.toString())) {
        fieldKeyMap.current?.set(field.key.toString(), uuidV4());
      }
      const uuid = fieldKeyMap.current?.get(field.key.toString());
      return {
        ...field,
        uuid,
      };
    });
  }, [fields]);

  const wrapperAction = useMemo(() => {
    const wrapAction = { ...action };
    const count = uuidFields.length;
    /**
     * 添加
     */
    if (actionGuard?.beforeAddRow) {
      wrapAction.add = async (...rest) => {
        const success = await actionGuard.beforeAddRow!(...rest, count);
        if (success) {
          const res = action.add(...rest);
          onAfterAdd?.(...rest, count + 1);
          return res;
        }
        return false;
      };
    } else {
      wrapAction.add = async (...rest) => {
        const res = action.add(...rest);
        onAfterAdd?.(...rest, count + 1);
        return res;
      };
    }
    /**
     * 移除
     */
    if (actionGuard?.beforeRemoveRow) {
      wrapAction.remove = async (...rest) => {
        const success = await actionGuard.beforeRemoveRow!(...rest, count);
        if (success) {
          const res = action.remove(...rest);
          onAfterRemove?.(...rest, count + 1);
          return res;
        }
        return false;
      };
    } else {
      wrapAction.remove = async (...rest) => {
        const res = action.remove(...rest);
        onAfterRemove?.(...rest, count + 1);
        return res;
      };
    }
    return wrapAction;
  }, [
    action,
    actionGuard?.beforeAddRow,
    actionGuard?.beforeRemoveRow,
    onAfterRemove,
    onAfterAdd,
    uuidFields.length,
  ]);

  const creatorButton = useMemo(() => {
    if (creatorButtonProps === false || uuidFields.length === max) return null;
    const {
      position = 'bottom',
      creatorButtonText = intl.getMessage(
        'editableTable.action.add',
        '添加一行数据',
      ),
    } = creatorButtonProps || {};
    return (
      <Button
        className={`${prefixCls}-creator-button-${position} ${hashId}`}
        type="dashed"
        loading={loading}
        block
        icon={<PlusOutlined />}
        {...omit(creatorButtonProps || {}, ['position', 'creatorButtonText'])}
        onClick={async () => {
          setLoading(true);
          let index = uuidFields.length;
          if (position === 'top') index = 0;
          await wrapperAction.add(runFunction(creatorRecord) || {}, index);
          setLoading(false);
        }}
      >
        {creatorButtonText}
      </Button>
    );
  }, [
    creatorButtonProps,
    uuidFields.length,
    max,
    intl,
    prefixCls,
    hashId,
    loading,
    wrapperAction,
    creatorRecord,
  ]);

  return (
    <div style={defaultStyle} className={containerClassName}>
      {creatorButtonProps !== false &&
        creatorButtonProps?.position === 'top' &&
        creatorButton}
      {uuidFields.map((field, index) => {
        return (
          <AppProFormListItem
            {...props}
            key={field.uuid}
            field={field}
            index={index}
            action={wrapperAction}
            count={uuidFields.length}
          >
            {children}
          </AppProFormListItem>
        );
      })}
      {fieldExtraRender && fieldExtraRender(wrapperAction, meta)}
      {creatorButtonProps !== false &&
        creatorButtonProps?.position !== 'top' &&
        creatorButton}
    </div>
  );
};

export { AppProFormListContainer };
