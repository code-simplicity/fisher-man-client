import { usePrevious } from 'ahooks';
import { Form } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import AppSubmitter from 'app-ant-design-components/AppSubmitter';
import deepEqual from 'deep-equal';
import get from 'rc-util/es/utils/get';
import set from 'rc-util/es/utils/set';
import { noteOnce } from 'rc-util/es/warning';
import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  type FC,
} from 'react';
import { useRefFn } from '../utils/hooks/useRefFn';
import {
  IAppBaseFormComponentsProps,
  IAppBaseFormProps,
} from './app-base-form';

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
 * 基础表单的组件
 * @param props
 * @constructor
 */
const AppBaseFormComponents: FC<IAppBaseFormComponentsProps> = (props) => {
  const {
    contentRender,
    children,
    autoFocusFirstInput = true,
    submitter,
    loading,
    form,
    formRef,
    formType,
    isKeyPressSubmit,
    onReset,
    omitNlUd = true,
    transformKey,
    serviceUrl,
    extraUrlParams,
    ...otherProps
  } = props;

  /**
   * form实例
   */
  const formInstance = Form.useFormInstance();

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
        transformKey(getFormInstance()?.getFieldsValue(allData!), omitNlUd),
      /**
       * 获取格式化之后的单个数据
       * @param paramsNameList
       */
      getFieldFormatValue: (paramsNameList: NamePath = []) => {
        const nameList = covertFormName(paramsNameList);
        if (!nameList) throw new Error('nameList不能为空');
        // nameList!是作为非空判断，这里就一个语法而已
        const value = getFormInstance().getFieldValue(nameList!);
        const obj = nameList ? set({}, nameList as string[], value) : value;
        return get(transformKey(obj, omitNlUd, nameList), nameList as string[]);
      },
      /**
       * 获取格式化之后的单个数据
       * 获取的值为 {key： {key： value}}
       * @param paramsNameList
       */
      getFieldFormatValueObject: (paramsNameList?: NamePath) => {
        const nameList = covertFormName(paramsNameList);
        const value = getFormInstance()?.getFieldValue(nameList!);
        const obj = nameList ? set({}, nameList as string[], value) : value;
        return transformKey(obj, omitNlUd, nameList);
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
        const transformedKey = transformKey(values, omitNlUd);
        return transformedKey ? transformedKey : {};
      },
      formRef,
    };
  }, [omitNlUd, transformKey]);

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
    formRef,
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
      omitNlUd,
    );
    // 清除数据
    submitterProps?.onReset?.(finalValues);
    onReset?.(finalValues);
    // 判断是否存在请求地址，存在就清除数据
    if (serviceUrl) {
      const params = Object.keys(
        transformKey(formRef?.current.getFieldsValue(), false),
      ).reduce((pre, next) => {
        return {
          ...pre,
          [next]: finalValues[next] || undefined,
        };
      }, extraUrlParams);
    }
  };

  /**
   * 渲染提交按钮和重置按钮
   */
  const submitterNode = useMemo(() => {
    if (!submitter) return undefined;
    return (
      <AppSubmitter
        {...submitterProps}
        key="submitter"
        onReset={handleReset}
        submitButtonProps={{ loading, ...submitterProps?.submitButtonProps }}
      ></AppSubmitter>
    );
  }, [
    submitter,
    loading,
    transformKey,
    onReset,
    omitNlUd,
    serviceUrl,
    extraUrlParams,
  ]);

  /**
   * 渲染内容
   */
  const content = useMemo(() => {
    const wrapItems = formItems;
    if (contentRender) {
      return contentRender(wrapItems, submitterNode, formRef?.current);
    }
    return wrapItems;
  }, [formItems, contentRender, submitterNode]);

  /**
   * 获取上一次的值
   */
  const preInitialValues = usePrevious(props.initialValues);

  useEffect(() => {
    if (
      serviceUrl ||
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

  return <>{content}</>;
};

const AppBaseForm: FC<IAppBaseFormProps> = (props) => {
  const {
    children,
    contentRender,
    fieldProps,
    formType,
    formItemProps,
    onInit,
    form,
    initialValues,
    ...otherProps
  } = props;
  /**
   * 表单的提交
   */
  const handleFinish = useRefFn(async () => {});
  return (
    <Form
      autoComplete="off"
      form={form}
      initialValues={initialValues}
      className={props.className}
      onFinish={handleFinish}
    ></Form>
  );
};

export default AppBaseForm;
