import { Outlet } from 'umi';
import { FC } from 'react';
import './index.less';

// 样式配置
const Layout: FC = () => {
  return (
    <div className="layout-container">
      <Outlet />
    </div>
  );
};

export default Layout;
