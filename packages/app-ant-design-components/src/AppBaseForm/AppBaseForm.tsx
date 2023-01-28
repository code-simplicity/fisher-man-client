import { useUrlSearchParams } from '@umijs/use-params';
import { usePrevious } from 'ahooks';
import { ConfigProvider, Form } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import classNames from 'classnames';
import deepEqual from 'deep-equal';
import omit from 'omit.js';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import get from 'rc-util/es/utils/get';
import Set from 'rc-util/es/utils/set';
import { noteOnce } from 'rc-util/es/warning';
import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type FC,
} from 'react';
import { v4 as uuidV4 } from 'uuid';
import AppSpin from '../AppSpin';
import AppSubmitter from '../AppSubmitter';
import {
  AppFieldContext,
  AppFormListContext,
  AppProConfigProvider,
  AppProFormContext,
  AppProFormEditOrReadOnlyContext,
} from '../context';
import { useFetchData, useRefFn } from '../hooks';
import {
  conversionMomentValue,
  runFunction,
  transformKeySubmitValue,
} from '../utils';
import { AppProFieldValueType, AppSearchTransformKeyFn } from '../utils/typing';
import { GridContext } from './context';
import { useGridHelpers } from './helpers';
import {
  AppBaseFormComponentsProps,
  AppBaseFormProps,
  AppProFormInstance,
} from './typing';

/**
 * form的name装换成数组 ['name']
 * @param name
 */
const covertFormName = (name?: NamePath) => {
  if (!name) return name;
  if (Array.isArray(name)) return name;
  return [name];
};

/**
 * 返回原始的参数
 * @param syncUrl 同步url
 * @param params 参数
 * @param type 类型，是get还是set
 */
const referenceParams = (
  syncUrl: AppBaseFormProps<any>['syncToUrl'],
  params: Record<string, any>,
  type: 'get' | 'set',
) => {
  if (syncUrl === true) {
    return params;
  }
  return runFunction(syncUrl, params, type);
};

/**
 * 基础表单的组件
 * @param props
 * @constructor
 */
const AppBaseFormComponents: FC<AppBaseFormComponentsProps> = (props) => {
  const {
    contentRender,
    children,
    autoFocusFirstInput = true,
    submitter,
    loading,
    form,
    formComponentType,
    isKeyPressSubmit,
    onReset,
    omitNil = true,
    transformKey,
    syncToUrl,
    extraUrlParams = {},
    grid,
    colProps,
    rowProps,
    onInit,
    onUrlSearchChange,
    formRef: propsFormRef,
    fieldProps,
    formItemProps,
    groupProps,
    ...otherProps
  } = props;

  /**
   * 获取antd提供出来的size注入，从而控制组件大小
   */
  const sizeContextValue = useContext(ConfigProvider.SizeContext);

  /**
   * form实例
   */
  const formInstance = Form.useFormInstance();

  /**
   * 同步url上传的参数
   */
  const formRef = useRef<AppProFormInstance>((form || formInstance) as any);

  /**
   * 布局
   */
  const { RowWrapper } = useGridHelpers({ grid, rowProps });

  /**
   * 使用useRefFn获取到组件的实例数据
   */
  const getFormInstance = useRefFn(() => formInstance);

  /**
   * 格式化数据
   */
  const formatValues = useMemo(() => {
    return {
      /**
       * 获取格式化之后的数据
       * @param allData boolean
       */
      getFieldsFormatValue: (allData?: true) =>
        transformKey(getFormInstance()?.getFieldsValue(allData!), omitNil),
      /**
       * 获取格式化之后的单个数据
       * @param paramsNameList
       */
      getFieldFormatValue: (paramsNameList: NamePath = []) => {
        const nameList = covertFormName(paramsNameList);
        if (!nameList) throw new Error('nameList不能为空');
        // nameList!是作为非空判断，这里就一个语法而已
        const value = getFormInstance().getFieldValue(nameList!);
        const obj = nameList ? Set({}, nameList as string[], value) : value;
        return get(transformKey(obj, omitNil, nameList), nameList as string[]);
      },
      /**
       * 获取格式化之后的单个数据
       * 获取的值为 {key： {key： value}}
       * @param paramsNameList
       */
      getFieldFormatValueObject: (paramsNameList?: NamePath) => {
        const nameList = covertFormName(paramsNameList);
        const value = getFormInstance()?.getFieldValue(nameList!);
        const obj = nameList ? Set({}, nameList as string[], value) : value;
        return transformKey(obj, omitNil, nameList);
      },
      /**
       * 验证字段之后返回格式化之后的所有数据
       * @param nameList (string|number[])
       */
      validateFieldsReturnFormatValue: async (nameList?: NamePath[]) => {
        if (nameList && Array.isArray(nameList))
          throw new Error('nameList必须是一个数组');
        const values = await getFormInstance().validateFields(nameList);
        // 转换完成的
        const transformedKey = transformKey(values, omitNil);
        return transformedKey ? transformedKey : {};
      },
      formRef,
    };
  }, [omitNil, transformKey]);

  /**
   * 返回表单的item
   */
  const formItems = useMemo(() => {
    /**
     * 将children转成数组并且返回克隆该组件返回一个新的组件
     */
    return React.Children.toArray(children as any).map((item, index) => {
      /**
       * 第一个表单item获取聚焦，当autoFocusFirstInput为真
       * isValidElement 验证是否是一个ele
       */
      if (index === 0 && autoFocusFirstInput && isValidElement(item)) {
        return cloneElement(item, {
          ...item.props,
          autoFocus: autoFocusFirstInput,
        });
      }
      return item;
    });
  }, [autoFocusFirstInput, children]);

  /**
   * 暴露出表单项的ref给外部使用
   */
  useImperativeHandle(
    propsFormRef,
    () => {
      return {
        ...formRef?.current,
        ...formatValues,
      };
    },
    [],
  );

  /**
   * 获取自定义提交的props
   */
  const submitterProps = useMemo(
    () => (typeof submitter === 'boolean' || !submitter ? {} : submitter),
    [submitter],
  );

  /**
   * 重置操作
   */
  const handleReset = () => {
    // 获取最后的值
    const finalValues = transformKey(
      formRef?.current?.getFieldsValue(),
      omitNil,
    );
    // 清除数据
    submitterProps?.onReset?.(finalValues);
    onReset?.(finalValues);
    // 同步url
    if (syncToUrl) {
      // 获取参数，使用reduce进行参数的累加计算
      const params = Object.keys(
        transformKey(formRef?.current?.getFieldsValue(), false),
      ).reduce((pre, next) => {
        return {
          ...pre,
          [next]: finalValues[next] || undefined,
        };
      }, extraUrlParams);
      /**
       * 同步url，进行参数转换
       */
      onUrlSearchChange?.(referenceParams(syncToUrl, params, 'set'));
    }
  };

  /**
   * 渲染提交按钮和重置按钮
   */
  const submitterNode = useMemo(() => {
    if (!submitter) return undefined;
    return (
      <AppSubmitter
        key="submitter"
        {...submitterProps}
        onReset={handleReset}
        submitButtonProps={{ loading, ...submitterProps?.submitButtonProps }}
      ></AppSubmitter>
    );
  }, [
    submitter,
    loading,
    submitterProps,
    transformKey,
    onReset,
    omitNil,
    syncToUrl,
    extraUrlParams,
    onUrlSearchChange,
  ]);

  /**
   * 渲染内容
   */
  const content = useMemo(() => {
    const wrapItems = grid ? <RowWrapper>{formItems}</RowWrapper> : formItems;
    if (contentRender) {
      return contentRender(wrapItems, submitterNode, formRef?.current);
    }
    return wrapItems;
  }, [formItems, contentRender, submitterNode, grid, formItems]);

  /**
   * 获取上一次初始值
   */
  const preInitialValues = usePrevious(props.initialValues);

  useEffect(() => {
    if (
      syncToUrl ||
      !props.initialValues ||
      !preInitialValues ||
      otherProps.request
    )
      return;
    // 相等对比，采用严格相等进行对比
    const isEqual = deepEqual(props?.initialValues, preInitialValues, {
      strict: true,
    });
    noteOnce(
      isEqual,
      'initialValues只会在form初始化的时候生效，如果需要异步加载推荐使用request，或者是initialValues ? <Form/> : null',
    );
  }, [props?.initialValues]);
  /**
   * 获取当前表单最后的值
   */
  useEffect(() => {
    const finalValues = transformKey(
      formRef?.current.getFieldsValue?.(true),
      omitNil,
    );
    onInit?.(finalValues, formRef?.current);
  }, []);

  return (
    <AppProFormContext.Provider value={formatValues}>
      <ConfigProvider.SizeContext.Provider
        value={otherProps.size || sizeContextValue}
      >
        <GridContext.Provider value={{ grid, colProps }}>
          {content}
        </GridContext.Provider>
      </ConfigProvider.SizeContext.Provider>
    </AppProFormContext.Provider>
  );
};

/**
 * 请求表单触发的id
 */
let requestFormCacheId = 0;

const AppBaseForm: FC<AppBaseFormProps> = (props) => {
  const {
    children,
    contentRender,
    fieldProps,
    formItemProps,
    form,
    formRef: propsFormRef,
    initialValues,
    request,
    params,
    formKey = requestFormCacheId,
    omitNil = true,
    formComponentType,
    groupProps,
    dateFormatter = 'string',
    syncToUrl,
    extraUrlParams = {},
    syncToInitialValues = false,
    syncToUrlAsImportant = true,
    grid,
    rowProps,
    colProps,
    readonly,
    onReset,
    onInit,
    ...otherProps
  } = props;
  // 表单的ref
  const formRef = useRef<AppProFormInstance<any>>({} as any);
  const [loading, setLoading] = useMergedState<boolean>(false);
  // const curFormKey = useRef<string>(nanoid());
  const curFormKey = useRef<string>(uuidV4());
  const [urlSearch, setUrlSearch] = useUrlSearchParams(
    {},
    { disabled: !syncToUrl },
  );

  /**
   * url上的参数进行合并
   */
  const [urlParamsMergeInitialValue, setUrlParamsMergeInitialValue] = useState(
    () => {
      if (!syncToUrl) {
        return {};
      }
      return referenceParams(syncToUrl, urlSearch, 'get');
    },
  );

  useEffect(() => {
    if (!syncToInitialValues) return;
    setUrlParamsMergeInitialValue({});
  }, [syncToInitialValues]);

  useEffect(() => {
    if (!syncToUrl) return;
    setUrlSearch({
      ...urlSearch,
      ...extraUrlParams,
    });
  }, [extraUrlParams, syncToUrl]);

  /**
   * 获取到弹出的容器，主要是为了区别是在modal/drawer还是普通的
   */
  const getPopupContainer = useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    // 如果是在DrawerForm或者是ModalForm就渲染到dom的父节点
    if (formComponentType && ['AppDrawerForm'].includes(formComponentType)) {
      return (e: HTMLElement) => e.parentNode || document.body;
    }
    return undefined;
  }, [formComponentType]);

  /**
   * 保存 transformKeyRef，用于对表单的key进行转化
   */
  const transformKeyRef = useRef<
    Record<string, AppSearchTransformKeyFn | undefined>
  >({});

  const fieldsValueType = useRef<
    Record<
      string,
      {
        valueType: AppProFieldValueType;
        dateFormat: string;
      }
    >
  >({});

  /**
   * 装换数据格式
   */
  const transformKey = useCallback(
    (values: any, paramsOmitNil: boolean, parentKey?: NamePath) => {
      // 数据格式的装换
      transformKeySubmitValue(
        conversionMomentValue(
          values,
          dateFormatter,
          fieldsValueType.current,
          paramsOmitNil,
          parentKey,
        ),
        transformKeyRef.current,
        paramsOmitNil,
      );
    },
    [dateFormatter],
  );

  useEffect(() => {
    requestFormCacheId += 0;
  }, []);

  /**
   * 获取接口请求的初始化数据
   */
  const [initialData] = useFetchData({ request, params, proFieldKey: formKey });

  /**
   * 暴露ref给父组件
   */
  useImperativeHandle(
    propsFormRef,
    () => {
      return formRef?.current;
    },
    [!initialData],
  );

  /**
   * 表单的提交
   */
  const handleFinish = useRefFn(async () => {
    /**
     * 表单组件没有设置onFinish就不执行
     */
    if (!otherProps.onFinish) return;
    /**
     * 防止重复提交
     */
    if (loading) return;
    /**
     * loading中
     */
    setLoading(true);

    try {
      const finalValues = formRef?.current?.getFieldsValue?.();
      /**
       * 回调最终的value
       */
      await otherProps.onFinish(finalValues);
      /**
       * 同步url
       */
      if (syncToUrl) {
        const syncToUrlParams = Object.keys(
          formRef?.current?.getFieldsFormatValue?.(undefined, false),
        ).reduce((pre, next) => {
          return {
            ...pre,
            [next]: finalValues[next] ?? undefined,
          };
        }, extraUrlParams);
        /**
         * 当原来的url参数被删掉的时候，将params中的字段值设为undefined，触发url同步删除
         */
        Object.keys(urlSearch).forEach((key) => {
          if (
            syncToUrlParams[key] !== false &&
            syncToUrlParams[key] !== 0 &&
            !syncToUrlParams[key]
          ) {
            syncToUrlParams[key] = undefined;
          }
        });
        setUrlSearch(referenceParams(syncToUrl, syncToUrlParams, 'set'));
      }
      /**
       * loading关闭
       */
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  });

  /**
   * 不是初始化并且是在请求就显示loading
   */
  if (!initialData && props.request) {
    return <AppSpin></AppSpin>;
  }

  return (
    <AppProFormEditOrReadOnlyContext.Provider
      value={{ mode: readonly ? 'read' : 'edit' }}
    >
      <AppProConfigProvider needDeps>
        <AppFieldContext.Provider
          value={{
            formRef,
            fieldProps,
            formItemProps,
            formComponentType,
            groupProps,
            getPopupContainer,
            formKey: curFormKey.current,
            setFieldValueType: (
              name,
              { valueType = 'text', dateFormat, transform },
            ) => {
              if (!Array.isArray(name)) return;
              transformKeyRef.current = Set(
                transformKeyRef.current,
                name,
                transform,
              );
              fieldsValueType.current = Set(fieldsValueType.current, name, {
                valueType,
                dateFormat,
              });
            },
          }}
        >
          <AppFormListContext.Provider value={{}}>
            <Form
              {...omit(otherProps, [
                'labelWidth',
                'autoFocusFirstInput',
              ] as any[])}
              autoComplete="off"
              form={form}
              initialValues={
                syncToInitialValues
                  ? {
                      ...initialValues,
                      ...initialData,
                      ...urlParamsMergeInitialValue,
                    }
                  : {
                      ...urlParamsMergeInitialValue,
                      ...initialValues,
                      ...initialData,
                    }
              }
              className={classNames(props.className)}
              onValuesChange={(changedValues, values) => {
                otherProps?.onValuesChange?.(
                  transformKey(changedValues, !!omitNil),
                  transformKey(values, !!omitNil),
                );
              }}
              onFinish={handleFinish}
            >
              <AppBaseFormComponents
                transformKey={transformKey}
                autoComplete="off"
                loading={loading}
                {...props}
                formRef={formRef}
                initialValues={{
                  ...initialValues,
                  ...initialData,
                }}
              />
            </Form>
          </AppFormListContext.Provider>
        </AppFieldContext.Provider>
      </AppProConfigProvider>
    </AppProFormEditOrReadOnlyContext.Provider>
  );
};

export default AppBaseForm;
