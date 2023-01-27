import { FormListFieldData } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import { createContext } from 'react';

/**
 * 表单列表的内容
 */
const AppFormListContext = createContext<
  | (FormListFieldData & {
      listName: NamePath;
    })
  | Record<string, any>
>({});

export { AppFormListContext };
