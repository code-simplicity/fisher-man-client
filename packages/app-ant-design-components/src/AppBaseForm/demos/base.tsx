import { AppProForm } from 'app-ant-design-components';

import { Form, Input } from 'antd';
import React from 'react';

export default () => {
  return (
    <>
      <AppProForm
        initialValues={{
          com: '测试',
        }}
      >
        <Form.Item label="签约公司" name="com">
          <Input />
        </Form.Item>
      </AppProForm>
    </>
  );
};
