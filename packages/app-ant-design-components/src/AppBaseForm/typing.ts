import type { ColProps, FormInstance, FormItemProps, FormProps } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import { MutableRefObject, ReactElement, ReactNode, RefObject } from 'react';
import { AppProFormInstanceType } from '../context/AppProFormContext/index';
import { ProRequest } from '../hooks';
import { FieldProps, GroupProps, SubmitterProps } from '../typing';

/**
 * 超级表单的实例类型
 */
export type AppProFormInstance<T = any> = FormInstance<T> &
  AppProFormInstanceType<T>;

/**
 * 表单栅格布局的配置
 */
export interface AppProFormGridConfig {
  /**
   * 是否开启栅格布局
   * 默认false
   */
  grid?: boolean;
  /**
   * 栅格布局的行
   * {gutter: 8}
   */
  rowProps?: ColProps;
  /**
   * 栅格布局的列
   * 使用例子
   * {span: 12}
   * {
   *   xs: {
   *     span: 12
   *   },
   *   sm: {
   *     xxx
   *   }
   * }
   */
  colProps?: ColProps;
}

/**
 * 表单通用的属性
 */
export interface CommonFormProps<
  T = Record<string, any>,
  U = Record<string, any>,
> extends AppProFormGridConfig {
  /**
   * 自定义提交
   */
  submitter?:
    | SubmitterProps<{
        form?: FormInstance<any>;
      }>
    | false;
  /**
   * 表单提交之后的回调，接口调用处使用
   * @param value 表单收集的值
   */
  onFinish?: (value: T) => Promise<boolean | void>;
  /**
   * 表单的ref，用于获取表单的实例
   * 其实就是实现了Form的获取值的一种方法
   */
  formRef?: MutableRefObject<any> | RefObject<any>;
  /**
   * 第一项获取聚焦
   * 针对input
   */
  autoFocusFirstInput?: boolean;
  /**
   * 是否开启回车提交
   */
  isKeyPressSubmit?: boolean;

  /**
   * 只读，表单全局只读和编辑
   * 优先级低于表单项的readonly
   */
  readonly?: boolean;
  /**
   * 是否去掉值中null或者是undefined
   */
  omitNlUd?: boolean;
  /**
   * 同步url，如果是一个函数，那么就会执行这个函数
   */
  syncToUrl?: ((values: T, type: 'get' | 'set') => T) | boolean;
  /**
   * 额外的url参数
   */
  extraUrlParams?: Record<string, any>;
  /**
   * 发起网络请求的参数
   */
  params?: U;
  /**
   * 请求，返回值会覆盖掉initialValues
   */
  request?: ProRequest<T, U>;
  /**
   * 用于控制form 是否相同的key，高阶用法
   */
  formKey?: string;
}

/**
 * 基础表单的组件搭建
 */
export interface AppBaseFormProps<T = Record<string, any>>
  extends Omit<FormProps, 'onFinish'>,
    CommonFormProps<T> {
  /**
   * 内容的渲染
   * @param item 自定义表单项内容
   * @param onSubmit 提交的配置
   * @param form 表单
   */
  contentRender?: (
    items: ReactNode[] | JSX.Element,
    submitter: ReactElement | undefined,
    form: FormInstance<any>,
  ) => ReactNode;
  /**
   * 表单字段的属性
   */
  fieldProps?: FieldProps<unknown>;
  /**
   * 表单项的配置
   */
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
  /**
   * 是否开启回车提交
   */
  isKeyPressSubmit?: boolean;
  /**
   * 表单类型 支持类型可以进行拖拽，比如弹窗是可以拖动的
   * AppDrawerForm 侧拉表单
   * AppModalForm 弹窗表单
   * QueryFilter 列表查询过滤表单
   */
  formComponentType?: 'AppDrawerForm' | 'AppModalForm' | 'QueryFilter';
  /**
   * 表单初始化，form就位，可以进行操作
   * @param values 表单收集的数据
   * @param form 表单的实例
   */
  onInit?: (values: T, form: AppProFormInstance<any>) => void;
}

/**
 * 表单项的组件参数
 */
export interface AppBaseFormComponentsProps extends AppBaseFormProps {
  /**
   * 加载loading
   */
  loading?: boolean;
  /**
   * 数据变换
   * @param values key存储
   * @param omit
   * @param parentKey 父节点key
   */
  transformKey: (values: any, omit: boolean, parentKey?: NamePath) => any;
  /**
   * 同步url转换的函数
   * @param value
   */
  onUrlSearchChange?: (value: Record<string, string | number>) => void;
}

/**
 * 超级表单的props
 */
export type AppProFormProps<T = Record<string, any>> = Omit<
  FormProps<T>,
  'onFinish'
> &
  CommonFormProps<T> & {
    children?: ReactNode[] | ReactNode;
  };
