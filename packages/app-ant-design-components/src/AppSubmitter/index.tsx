import { Button, Form, Space } from 'antd';
import omit from 'omit.js';
import React, { type FC } from 'react';
import { IAppSubmitterProps } from './app-submitter';

/**
 * 提交组合的按钮
 * @param props
 * @constructor
 */
const AppSubmitter: FC<IAppSubmitterProps> = (props) => {
  const {
    render,
    onSubmit,
    onReset,
    searchConfig = {},
    submitButtonProps = {},
    resetButtonProps = {},
  } = props;
  const form = Form.useFormInstance();
  if (!render) return null;
  /**
   * 提交
   */
  const handleSubmit = () => {
    form.submit();
    onSubmit?.();
  };

  /**
   * 重置
   */
  const handleReset = () => {
    form.resetFields();
    onReset?.();
  };
  const { submitText = '提交', resetText = '重置' } = searchConfig;

  const dom = [];
  // 重置
  if (!resetButtonProps) {
    dom.push(
      <Button
        {...omit(resetButtonProps, ['preventDefault'])}
        key="reset"
        onClick={(e) => {
          if (!resetButtonProps?.preventDefault) handleReset();
          resetButtonProps?.onClick?.(e);
        }}
      >
        {resetText}
      </Button>,
    );
  }
  // 提交
  if (!submitButtonProps) {
    dom.push(
      <Button
        {...omit(submitButtonProps, ['preventDefault'])}
        type="primary"
        key="submit"
        onClick={(e) => {
          if (!resetButtonProps?.preventDefault) handleSubmit();
          resetButtonProps?.onClick?.(e);
        }}
      >
        {submitText}
      </Button>,
    );
  }
  const renderDom = render
    ? render({ ...props, form, onSubmit, onReset }, dom)
    : dom;
  if (Array.isArray(renderDom)) {
    if (renderDom.length < 1) {
      return null;
    }
    if (renderDom.length === 1) {
      return renderDom[0] as JSX.Element;
    }
    return <Space>{renderDom}</Space>;
  }
  return renderDom as JSX.Element;
};

export default AppSubmitter;
