import { createContext } from 'react';

/**
 * 表单编辑或者只读上下文
 */
const AppProFormEditOrReadOnlyContext = createContext({
  // edit | readonly
  mode: 'edit',
});

export { AppProFormEditOrReadOnlyContext };
