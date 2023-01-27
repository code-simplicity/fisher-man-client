import type { FormListOperation } from 'antd';
import { ConfigProvider, Form } from 'antd';
import { useIntl } from 'dumi';
import React, { useContext, useMemo, useRef } from 'react';
import { useGridHelpers } from '../../AppBaseForm/helpers';
import { AppFormListContext } from '../../context';
import { AppProFormListContainer } from './ListContainer';
import type { ProFormListProps } from './typing';

const { Item, List } = Form;

/**
 * 超级表单的选项列
 * @param props
 * @constructor
 */
function AppProFormList<T>(props: ProFormListProps<T>) {
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
  /**
   * 多语言
   */
  const intl = useIntl();
  const { ColWrapper, RowWrapper } = useGridHelpers({ colProps, rowProps });

  /**
   * 处理list的嵌套情况
   */
  const name = useMemo(() => {
    if (listContext.name === undefined) {
      return [rest.name].flat(1);
    }
    return [listContext.name, rest.name].flat(1);
  }, [listContext.name, rest.name]);

  return (
    <ColWrapper>
      <div>
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
                  <AppProFormListContainer></AppProFormListContainer>
                </RowWrapper>
              );
            }}
          </List>
        </Item>
      </div>
    </ColWrapper>
  );
}

export { AppProFormList };
