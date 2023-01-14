import type {
  ColProps,
  FormInstance,
  FormItemProps,
  FormProps,
  LabelTooltipType,
  NamePath,
  SpaceProps,
} from 'antd';
import {
  CSSProperties,
  MutableRefObject,
  ReactElement,
  ReactNode,
  Ref,
  RefObject,
} from 'react';
import { IAppProFormInstanceType } from '../context/AppProFormContext/index';
import { IProRequest } from '../hooks';
import { ISubmitterProps } from '../typing';

/**
 * 分组的props
 */
export type GroupProps = {
  /**
   * 分组标题
   */
  title?: ReactNode;
  /**
   * 分组标签
   */
  label?: ReactNode;
  /**
   * 自定义提示信息
   * 可以嵌套任意组件进行展示
   */
  toolTip?: LabelTooltipType | string;
  /**
   * 额外的配置，用于配置标题另外一边的内容
   */
  extra?: ReactNode;
  /**
   * 组件之间的间隔
   */
  size?: SpaceProps['size'];
  /**
   * 组件的内联样式
   */
  style?: CSSProperties;
  /**
   * 标题的内联样式
   */
  title?: CSSProperties;
  /**
   * 自定义标题render
   * @param title 标题
   * @param props props
   */
  titleRender?: (title: ReactNode, props: GroupProps) => ReactNode;
  /**
   * 对其方式
   * 参数 'start' | 'end' | 'center' | 'baseline';
   */
  align?: SpaceProps['align'];
  /**
   * 子项目排列方式
   * 'horizontal' | 'vertical';
   */
  direction?: SpaceProps['direction'];
  /**
   * 标签和项目的对其方式
   * 单行、两行
   */
  labelLayout?: 'inline' | 'twoLine';
  /**
   * 是否折叠
   */
  collapsed?: boolean;
  /**
   * 是否可折叠
   */
  collapsible?: boolean;
  /**
   * 默认折叠状态
   */
  defaultCollapsed?: boolean;
  /**
   * 自定义选择一个input进行聚焦
   */
  autoFocus?: boolean;
  children?: ReactNode;
  /**
   * 折叠状态的修改
   * @param collapsed 折叠状态
   */
  onCollapse?: (collapsed: boolean) => void;
} & AppProFormGridConfig;

/**
 * 字段的props
 */
export type FieldProps<K> = {
  /**
   * 字段样式
   */
  style?: CSSProperties;
  /**
   * 宽度
   */
  width?: string;
  /**
   * ref
   */
  ref?: Ref<K>;
};

/**
 * 超级表单的实例类型
 */
export type AppProFormInstance<T = any> = FormInstance<T> &
  IAppProFormInstanceType<T>;

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
export interface ICommonFormProps<
  T = Record<string, any>,
  U = Record<string, any>,
> extends AppProFormGridConfig {
  /**
   * 自定义提交
   */
  submitter?:
    | ISubmitterProps<{
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
  request?: IProRequest<T, U>;
  /**
   * 用于控制form 是否相同的key，高阶用法
   */
  formKey?: string;
}

/**
 * 基础表单的组件搭建
 */
export interface IAppBaseFormProps<T = Record<string, any>>
  extends Omit<FormProps, 'onFinish'>,
    ICommonFormProps<T> {
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
  formType?: 'AppDrawerForm' | 'AppModalForm' | 'QueryFilter';
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
export interface IAppBaseFormComponentsProps extends IAppBaseFormProps {
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
export type IAppProFormProps<T = Record<string, any>> = Omit<
  FormProps<T>,
  'onFinish'
> &
  ICommonFormProps<T> & {
    children?: ReactNode[] | ReactNode;
  };
