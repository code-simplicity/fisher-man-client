import { StyleProvider } from '@ant-design/cssinjs';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from 'antd';
import { AppSetting } from 'app-ant-design-components';
import React, { FC, ReactNode, useState } from 'react';
import { Outlet } from 'umi';
import routes from '../../config/routes';
import './index.less';

interface LayoutProps {
  children: ReactNode;
}

type AppSettingConfigData = {
  colorPrimary: string;
};

const defaultAppSettingConfig = {
  colorPrimary: '#1677ff',
};

const { Header, Sider, Content } = Layout;

/**
 * 布局配置
 * @param props
 * @constructor
 */
const AppLayout: FC<LayoutProps> = (props) => {
  const { children } = props;
  console.log('routes 111 ==>', routes);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [draggableState, setDraggableState] = useState<any>({
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: -400,
      y: 200,
    },
  });
  const handleAppSetting = (data: any) => {
    console.log('data ==>', data);
  };

  return (
    <ConfigProvider>
      <StyleProvider hashPriority="high">
        <Layout className="app-layout-container">
          <Sider
            className="app-layout-container-sider"
            style={{
              background: colorBgContainer,
            }}
          >
            <Header
              className=""
              style={{
                background: colorBgContainer,
              }}
            >
              icon + title
            </Header>
            <div>搜索</div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['4']}
              items={[
                UserOutlined,
                VideoCameraOutlined,
                UploadOutlined,
                UserOutlined,
              ].map((icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: `nav ${index + 1}`,
              }))}
              className="app-layout-container-menu"
            />
          </Sider>
          <Layout>
            <Header
              className="app-layout-container-header"
              style={{
                background: colorBgContainer,
              }}
            >
              菜单
            </Header>
            <Layout>
              <Breadcrumb style={{ margin: '16px 12px' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  margin: 12,
                  overflow: 'auto',
                }}
              >
                <div
                  style={{
                    padding: 12,
                    minHeight: 'calc(100%)',
                    background: colorBgContainer,
                  }}
                >
                  <Outlet />
                </div>
                <AppSetting onSubmit={handleAppSetting} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default AppLayout;
