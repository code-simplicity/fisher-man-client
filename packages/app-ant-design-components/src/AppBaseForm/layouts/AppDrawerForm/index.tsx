import type { DrawerProps, FormProps } from 'antd';
import { Drawer } from 'antd';
import { merge } from 'lodash';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React, {
  cloneElement,
  FC,
  Fragment,
  RefCallback,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useRefFn } from '../../../hooks';
import AppBaseForm from '../../AppBaseForm';
import { IAppProFormProps, ICommonFormProps } from '../../typing';

/**
 * 侧拉props
 */
export type IAppDrawerFormProps<T = Record<string, any>> = Omit<
  FormProps,
  'onFinish' | 'title'
> &
  ICommonFormProps<T> & {
    /**
     * 弹窗的title
     */
    title?: DrawerProps['title'];
    /**
     * 侧拉宽度
     */
    width?: DrawerProps['width'];
    /**
     * 侧拉的props配置
     */
    appDrawerProps?: Omit<DrawerProps, 'visible'>;
    /**
     * 触发弹窗打开的dom节点，只能设置一个
     */
    trigger?: JSX.Element;
    /**
     * 控制是否打开弹窗
     */
    visible?: boolean;
    /**
     * 控制打开弹窗
     */
    open?: DrawerProps['open'];
    /**
     * 返回一个Boolean，true在底部展示， false就在顶部区域展示，提供默认值为true
     */
    isFooter?: boolean;
    /**
     * 底部操作按钮的位置, false是flex-start true是flex-end
     */
    footerOperationDirection?: boolean;
    /**
     * 打开-关闭的事件
     * @param visible
     */
    onOpenDrawChange?: (visible: boolean) => void;
    /**
     * 表单提交的调用
     * 这里可以通用设置返回值为true/false进行抽屉的关闭
     * @param values
     */
    onFinish?: (values: T) => Promise<any>;
  };

const AppDrawerForm: FC<IAppDrawerFormProps> = (props) => {
  const {
    title,
    width,
    children,
    visible,
    open: propsOpen,
    appDrawerProps,
    trigger,
    isFooter,
    footerOperationDirection,
    onFinish,
    onOpenDrawChange,
    ...otherProps
  } = props;
  /**
   * 底部的ref
   */
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState([]);
  /**
   * 打开侧拉的控制
   */
  const [open, setOpen] = useMergedState(!!visible, {
    value: propsOpen || visible,
    onChange: onOpenDrawChange,
  });
  /**
   * 打开弹窗的dom节点
   */
  const triggerDom = useMemo(() => {
    // 首先就是判断空处理
    if (!trigger) return null;
    /**
     * 克隆dom，并且返回
     */
    return cloneElement(trigger, {
      key: 'trigger',
      ...trigger.props,
      onClick: async (e: any) => {
        setOpen(!open);
        trigger.props?.onClick?.(e);
      },
    });
  }, [setOpen, open, trigger]);
  /**
   * 表单的ref
   */
  const formRef = useRef<IAppProFormProps>();
  /**
   * 控制表单提交
   */
  const handleFinish = useRefFn(async (values) => {
    const response = onFinish?.(values);
  });

  /**
   * 底部的ref，也可以作为顶部，通过props进行操作
   */
  const footerDomRef: RefCallback<HTMLDivElement> = useCallback((el) => {
    if (!footerRef.current && el) {
      // 刷新，使用一个占位进行
      forceUpdate([]);
    }
    footerRef.current = el;
  }, []);

  useEffect(() => {
    if (open && (propsOpen || visible)) {
      onOpenDrawChange?.(true);
    }
    console.log('footerDomRef ==>', footerDomRef);
  }, [visible, open]);

  /**
   * 关闭弹窗
   * @param e
   */
  const handleClose = (e: any) => {
    // 关闭弹窗，如果正在loading或者未超时，阻止关闭
    if (loading) return;
    setOpen(false);
    // 调用关闭
    appDrawerProps?.onClose?.(e);
  };
  /**
   * 渲染内容
   * createPortal 将子节点渲染到dom节点的方式
   */
  const contentRender = useCallback((formDom: any, submitter: any) => {
    return (
      <>
        {formDom}
        {footerRef.current && submitter ? (
          <Fragment key="submitter">
            {createPortal(submitter, footerRef.current)}
          </Fragment>
        ) : (
          submitter
        )}
      </>
    );
  }, []);
  /**
   * 重置表单
   * 使用useCallback，otherProps.form, otherProps.formRef, appDrawerProps?.destroyOnClose 任意一个改变都会触发
   */
  const handleResetFields = useCallback(() => {
    // ??操作符说明 这里为了简化一些没必要的undefined和null，采用‘??’ 如果左侧的null或者是undefined 返回右侧的，否则返回左侧的
    const form =
      otherProps.formRef?.current ?? otherProps.form ?? formRef.current;
    // 重置表单
    if (form && appDrawerProps?.destroyOnClose) {
      form.resetFields();
    }
  }, [otherProps.form, otherProps.formRef, appDrawerProps?.destroyOnClose]);

  /**
   * 组合按钮的操作
   */
  const submitterConfig = useMemo(() => {
    /**
     * 组合按钮是false就返回
     */
    if (!otherProps.submitter) {
      return false;
    }
    /**
     * 合并操作
     */
    return merge(
      {
        searchConfig: {
          submitText: '确认',
          resetText: '取消',
        },
        resetButtonProps: {
          preventDefault: true,
          // 提交表单的时候进行loading，弹窗不关闭
          disable: loading || undefined,
          onClick: (e: any) => {
            setOpen(false);
            // 取消关闭
            appDrawerProps?.onClose?.(e);
          },
        },
      },
      otherProps.submitter,
    );
  }, [otherProps.submitter, loading, setOpen, appDrawerProps]);

  return (
    <>
      <Drawer
        title={title}
        width={width}
        open={open}
        {...appDrawerProps}
        onClose={handleClose}
        afterOpenChange={(e) => {
          if (!e) handleResetFields();
          // 关闭之后的回调
          appDrawerProps?.afterOpenChange?.(e);
        }}
        footer={
          !otherProps.submitter &&
          isFooter && (
            <div
              ref={footerDomRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: footerOperationDirection
                  ? 'flex-start'
                  : 'flex-end',
              }}
            ></div>
          )
        }
        extra={
          !otherProps.submitter && !isFooter && <div ref={footerDomRef}></div>
        }
      >
        <AppBaseForm
          formType="AppDrawerForm"
          contentRender={contentRender}
          formRef={formRef}
          layout="vertical"
          {...otherProps}
          submitter={submitterConfig}
          onFinish={async (values) => {
            const result = await handleFinish(values);
            return result;
          }}
        >
          {children}
        </AppBaseForm>
      </Drawer>
      {triggerDom}
    </>
  );
};

AppDrawerForm.defaultProps = {
  width: 800,
  isFooter: true,
  footerOperationDirection: true,
};

export default AppDrawerForm;
