import { Button } from 'antd';
import { AppDrawerForm } from 'app-ant-design-components';
import React from 'react';
export default () => {
  return (
    <>
      <AppDrawerForm
        trigger={<Button type="primary">新建表单</Button>}
        isFooter={false}
      >
        <div>demo</div>
      </AppDrawerForm>
    </>
  );
};
