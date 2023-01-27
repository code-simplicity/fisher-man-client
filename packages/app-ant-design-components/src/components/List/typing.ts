import type {
  ButtonProps,
  FormInstance,
  FormListFieldData,
  FormListOperation,
} from 'antd';
import { FormListProps } from 'antd/es/form';
import type { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import { CSSProperties, FC, MutableRefObject, ReactNode } from 'react';
import type { AppProFormGridConfig } from '../../AppBaseForm';

export type FormListMeta = {
  name: FormListProps['name'];
  field: FormListFieldData;
  fields: FormListFieldData[];
  index: number;
  operation: FormListOperation;
  meta: {
    errors: ReactNode[];
  };
};

export type IconConfig = {
  /**
   * 新的icon组件，将其实例化
   */
  Icon?: FC<any>;
  /**
   * 提示文字
   */
  tooltipText?: string;
};

/**
 * 超级表单列表的通用props
 */
export type ProFormListCommonProps = {
  /**
   * 自定义薪资按钮的配置
   * 设置按钮到顶部 creatorButtonProps={{position: 'top'}}
   * 不显示按钮 creatorButtonProps={false}
   * 自定义文字文案 creatorButtonProps={{creatorButtonText: '新的按钮'}}
   * 兼容antd的button的props
   */
  creatorButtonProps?:
    | false
    | (ButtonProps & {
        creatorButtonText?: ReactNode;
        position?: 'top' | 'bottom';
      });
  /**
   * 复制按钮的配置
   */
  copyIconProps?: IconConfig | false;
  /**
   * 删除按钮的配置
   */
  deleteIconProps?: IconConfig | false;
  /**
   * 新建的默认数据
   */
  creatorRecord?: Record<string, any> | (() => Record<string, any>);
  /**
   * 自定义操作按钮
   */
  actionRender?: (
    /**
     * 字段
     */
    field: FormListFieldData,
    /**
     * 触发条件
     */
    action: FormListOperation,
    /**
     * 默认的操作dom
     * [删除，复制，新增]
     */
    defaultActionDom: ReactNode[],
    /**
     * 当前共有几个列表项
     */
    count: number,
  ) => ReactNode[];
  /**
   * list 的内容的渲染函数
   */
  itemContainerRender?: (doms: ReactNode, listMeta: FormListMeta) => ReactNode;
  /**
   * 自定义item 可以将action（操作）放在别的地方
   * 将每个item放到一个卡片里
   * itemRender: (dom,listMeta) => <Card extra={dom.action}  title={listMeta?.record?.name}>{dom.listDom}</Card>
   * @param dom
   * @param listMeta
   */
  itemRender?: (
    dom: { listDom: ReactNode; action: ReactNode },
    /**
     * list的基本信息
     */
    listMeta: FormListMeta,
  ) => ReactNode;
  /**
   * 总是展示每一行的label
   */
  alwaysShowItemLabel?: boolean;
  /**
   * 允许增加的最大条数
   */
  max?: number;
  /**
   * 允许增加的最少条数，删除时校验
   */
  min?: number;
  /**
   * 盒子的类名称
   */
  containerClassName?: string;
  /**
   * 盒子的样式
   */
  containerStyle?: CSSProperties;
};

export type FormListActionGuard = {
  /**
   * 添加行之前的钩子 返回false会阻止这个行为
   * @param params
   * 阻止新增 beforeAddRow={()=> return false}
   */
  beforeAddRow?: (
    ...params: [...Parameters<FormListOperation['add']>, number]
  ) => boolean | Promise<boolean>;
  /**
   * 移除行之前的钩子 返回false会阻止这个行为
   * @param params
   * 阻止删除 beforeAddRow={()=> return false}
   */
  beforeRemoveRow?: (
    ...params: [...Parameters<FormListOperation['remove']>, number]
  ) => boolean | Promise<boolean>;
};

export type ChildrenItemFunction = (
  /**
   * 当前行的元消息
   */
  meta: FormListFieldData,
  /**
   * 当前的行号
   */
  index: number,
  /**
   * 用于操作行的一些快捷方法
   * 给第二行增加数据 action.add?.({},1);
   * 删除第二行 action.remove?.(1);
   * 从 1 移到 2: action.move?.(2,1);
   * 获取当前行的数据: action.getCurrentRowData() -> {id:"xxx",name:'123',age:18}
   * 设置当前行的数据: {id:"123",name:'123'} -> action.setCurrentRowData({name:'xxx'}) -> {id:"123",name:'xxx'}
   * 清空当前行的数据：{id:"123",name:'123'} -> action.setCurrentRowData({name:undefined}) -> {id:"123"}
   */
  action: FormListOperation & {
    /**
     * 获取当前的行的数据
     */
    getCurrentRowData: () => any;
    /**
     * 设置当前行的数据
     * {id:"123",name:'123'} -> setCurrentRowData({name:'xxx'}) -> {id:"123",name:'123'}
     * {id:"123",name:'123'} -> setCurrentRowData({name:undefined}) -> {id:"123"}
     * @param data
     */
    setCurrentRowData: (data: any) => void;
  },
  /**
   * 总行数
   */
  count: number,
) => ReactNode;

/**
 * 触发条件
 */
export type FormListActionType<T = any> = FormListOperation & {
  get: (index: number) => T | undefined;
  getList: () => T[] | undefined;
};

/**
 * 表单列表的props
 */
export type ProFormListProps<T> = Omit<FormListProps, 'children' | 'rules'> &
  ProFormListCommonProps & {
    /**
     * 列表的标签
     */
    label?: ReactNode;
    /**
     * 标题旁边的提示，自定义提示内容
     * 自定义提示信息
     * <AppProForm.Group title="标题"  tooltip="自定义提示信息">
     * 自定义Icon
     * <AppProForm.Group title="标题"  tooltip={{icon:<Info/>,title:自定义提示信息}}>
     */
    tooltip?: LabelTooltipType;
    /**
     * 行操作的钩子配置
     * 阻止删除 actionGuard={{beforeRemoveRow: () => return false}}
     * 阻止新增 actionGuard={{beforeAddRow: () => return false}}
     */
    actionGuard?: FormListActionGuard;
    /**
     * 子组件
     */
    children?: ReactNode | ChildrenItemFunction;
    /**
     * 最后的按钮添加dom节点
     * @param fieldAction
     * @param meta
     * fieldExtraRender={(fieldAction) => {<a onClick={()=>fieldAction.add({id:"xx"})}>新增</a>}}
     */
    fieldExtraRender?: (
      fieldAction: FormListOperation,
      meta: {
        errors?: ReactNode[];
        warnings?: ReactNode[];
      },
    ) => ReactNode;
    actionRef?: MutableRefObject<FormListActionType<T> | undefined>;
    /**
     * 内联样式
     */
    style?: CSSProperties;
    /**
     * 数据添加成功的回调
     * @param params
     */
    onAfterAdd?: (
      ...params: [...Parameters<FormListOperation['add']>, number]
    ) => void;
    /**
     * 数据移除成功的回调
     * @param params
     */
    onAfterRemove?: (
      ...params: [...Parameters<FormListOperation['remove']>, number]
    ) => void;
    /**
     * 是否同时校验列表是否为空
     */
    isValidateList?: boolean;
    /**
     * 获取到操作的实例
     * 可用删除，新增，移动等操作
     * actionRef?.current.add?.({},1);
     * actionRef?.current.remove?.(1);
     * actionRef?.current.move?.(1,2);
     * actionRef?.current.get?.(1);
     * actionRef?.current.getList?.();
     */
    /**
     * 当 isValidateList=true时执行空提示
     */
    emptyListMessage?: string;
    /**
     * 规则
     */
    rules?: (Required<FormListProps>['rules'][number] & {
      required?: boolean;
    })[];
    /**
     * 是否必填
     */
    required?: boolean;
  } & Pick<AppProFormGridConfig, 'colProps' | 'rowProps'>;

export type AppProFormListItemProps = ProFormListCommonProps & {
  /**
   * 表单实例
   */
  formInstance: FormInstance;
  /**
   * 操作
   */
  action: FormListOperation;
  /**
   * 操作项守卫
   */
  actionGuard?: FormListActionGuard;
  /**
   * 样式前缀
   */
  prefixCls: string;
  /**
   * 字段集合
   */
  fields: FormListFieldData[];
  /**
   * 元消信息
   */
  meta: {
    errors: ReactNode[];
  };
  /**
   * 字段名称
   */
  name: FormListProps['name'];
  /**
   * 原字段名称
   */
  originName: FormListProps['name'];
  /**
   * 最后的按钮添加dom节点
   * @param fieldAction
   * @param meta
   * fieldExtraRender={(fieldAction) => {<a onClick={()=>fieldAction.add({id:"xx"})}>新增</a>}}
   */
  fieldExtraRender?: (
    fieldAction: FormListOperation,
    meta: {
      errors?: ReactNode[];
      warnings?: ReactNode[];
    },
  ) => ReactNode;
  /**
   * 列表当前条目数量
   */
  count: number;
  children?: ReactNode | ChildrenItemFunction;
  /**
   * 数据新增成功回调
   * @param params
   */
  onAfterAdd?: (
    ...params: [...Parameters<FormListOperation['add']>, number]
  ) => void;
  /**
   * 数据移除成功回调
   * @param params
   */
  onAfterRemove?: (
    ...params: [...Parameters<FormListOperation['remove']>, number]
  ) => void;
};
