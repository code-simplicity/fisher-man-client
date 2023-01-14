import React, { FC } from 'react';
import AppBaseForm from '../../AppBaseForm';
import { AppProFormProps } from '../../typing';

/**
 * 基础的超级表单
 * @param props
 * @constructor
 */
const AppProForm: FC<AppProFormProps> = (props) => {
  return (
    <AppBaseForm
      submitter={{
        // 进行按钮的反转
        render: (_, dom) => dom.reverse(),
      }}
      contentRender={(items, submitter) => {
        return (
          <>
            {items}
            {submitter}
          </>
        );
      }}
      {...props}
    />
  );
};

export default AppProForm;
