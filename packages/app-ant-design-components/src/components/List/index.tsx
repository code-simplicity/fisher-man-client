import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormListOperation } from 'antd';
import { ConfigProvider, Form } from 'antd';
import classNames from 'classnames';
import { noteOnce } from 'rc-util/es/warning';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useGridHelpers } from '../../AppBaseForm/helpers';
import { AppFormListContext, AppProFormContext } from '../../context';
import { useIntl } from '../../hooks';
import { AppProFormListContainer } from './ListContainer';
import { useStyle } from './style';
import type { ProFormListProps } from './typing';

const { Item, List, ErrorList } = Form;

/**
 * 超级表单的选项列
 * @param props
 * @constructor
 */
function AppProFormList<T>(props: ProFormListProps<T>) {
  /**
   * 多语言
   */
  const intl = useIntl();

  const {
    label,
    prefixCls,
    rules,
    style,
    tooltip,
    colProps,
    rowProps,
    isValidateList = false,
    emptyListMessage = '列表不能为空',
    onAfterAdd,
    onAfterRemove,
    children,
    copyIconProps = {
      Icon: CopyOutlined,
      tooltipText: intl.getMessage('copyThisLine', '复制此行'),
    },
    deleteIconProps = {
      Icon: DeleteOutlined,
      tooltipText: intl.getMessage('deleteThisLine', '删除此行'),
    },
    itemContainerRender,
    itemRender,
    fieldExtraRender,
    creatorButtonProps,
    creatorRecord,
    actionRender,
    actionGuard,
    alwaysShowItemLabel,
    min,
    max,
    ...rest
  } = props;

  const actionRefs = useRef<FormListOperation>();
  /**
   * 上下文内容
   */
  const context = useContext(ConfigProvider.ConfigContext);
  const listContext = useContext(AppFormListContext);
  /**
   * 基座的className
   */
  const baseClassName = context.getPrefixCls('app-pro-form-list');
  const { wrapSSR, hashId } = useStyle(baseClassName);
  const { ColWrapper, RowWrapper } = useGridHelpers({ colProps, rowProps });
  const proFormContext = useContext(AppProFormContext);

  /**
   * 处理list的嵌套情况
   */
  const name = useMemo(() => {
    if (listContext.name === undefined) {
      return [rest.name].flat(1);
    }
    return [listContext.name, rest.name].flat(1);
  }, [listContext.name, rest.name]);

  useImperativeHandle(
    actionRefs,
    () => {
      return {
        ...actionRefs.current,
        get: (index: number) => {
          return proFormContext.formRef!.current!.getFieldValue([
            ...name,
            index,
          ]);
        },
        getList: () => {
          return proFormContext.formRef!.current!.getFieldValue([...name]);
        },
      } as any;
    },
    [name, proFormContext.formRef],
  );

  useEffect(() => {
    noteOnce(
      !!proFormContext.formRef,
      `AppProFormList 必须要放到 AppProForm 中,否则会造成行为异常！！！`,
    );
    noteOnce(
      !!proFormContext.formRef,
      `AppProFormList must be placed in AppProForm, otherwise it will cause abnormal behavior!!!`,
    );
  }, [proFormContext.formRef]);

  /**
   * 如果form上下文是空的，那就返回一个null
   */
  if (!proFormContext.formRef) return null;

  return wrapSSR(
    <ColWrapper>
      <div className={classNames(baseClassName, hashId)} style={style}>
        <Item
          label={label}
          prefixCls={prefixCls}
          tooltip={tooltip}
          style={style}
          required={rules?.some((rule) => rule.required)}
          {...rest}
          name={isValidateList ? name : undefined}
          rules={
            isValidateList
              ? [
                  {
                    validator: (rule, value) => {
                      /**
                       * 空提示
                       */
                      if (!value || value.length === 0) {
                        return Promise.reject(new Error(emptyListMessage));
                      }
                      return Promise.resolve();
                    },
                    required: true,
                  },
                ]
              : undefined
          }
        >
          <List rules={rules} {...rest} name={name}>
            {(fields, operation, meta) => {
              actionRefs.current = operation;
              return (
                <RowWrapper>
                  <AppProFormListContainer
                    name={name}
                    meta={meta}
                    originName={rest.name}
                    action={operation}
                    fields={fields}
                    formInstance={proFormContext.formRef!.current!}
                    prefixCls={baseClassName}
                    copyIconProps={copyIconProps}
                    deleteIconProps={deleteIconProps}
                    itemContainerRender={itemContainerRender}
                    itemRender={itemRender}
                    fieldExtraRender={fieldExtraRender}
                    creatorButtonProps={creatorButtonProps}
                    creatorRecord={creatorRecord}
                    actionRender={actionRender}
                    actionGuard={actionGuard}
                    alwaysShowItemLabel={alwaysShowItemLabel}
                    min={min}
                    max={max}
                    count={fields.length}
                    onAfterAdd={(defaultValue, insertIndex, count) => {
                      if (isValidateList) {
                        proFormContext.formRef!.current!.validateFields([name]);
                      }
                      onAfterAdd?.(defaultValue, insertIndex, count);
                    }}
                    onAfterRemove={(index, count) => {
                      if (isValidateList) {
                        if (count === 0) {
                          proFormContext.formRef!.current!.validateFields([
                            name,
                          ]);
                        }
                      }
                      onAfterRemove?.(index, count);
                    }}
                  >
                    {children}
                  </AppProFormListContainer>
                  <ErrorList errors={meta.errors} />
                </RowWrapper>
              );
            }}
          </List>
        </Item>
      </div>
    </ColWrapper>,
  );
}

export { AppProFormList };
