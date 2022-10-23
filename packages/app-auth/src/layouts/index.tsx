import { Outlet } from 'umi';
import { FC, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import './index.less';

interface LayoutProps {
  children: ReactNode;
}

// 样式配置
const Layout: FC<LayoutProps> = (props) => {
  return (
    <ConfigProvider prefixCls="fisher">
      <div className="layout-container">
        {props.children}
        <Outlet />
      </div>
    </ConfigProvider>
  );
};

export default Layout;
