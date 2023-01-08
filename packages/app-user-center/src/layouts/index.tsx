import { StyleProvider } from '@ant-design/cssinjs';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import {
  Breadcrumb,
  ConfigProvider,
  Form,
  Layout,
  Menu,
  message,
  theme,
  Upload,
  UploadProps,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { AppSetting, AppSettingForm, AppSpin } from 'app-ant-design-components';
import React, { ReactNode, useEffect, useState, type FC } from 'react';
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
  const { handleUploadFileModel } = useModel('fileModel');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [appSettingConfig, setAppSettingConfig] = useState({
    loading: true,
  });

  // 是否展示上传文件
  const [showUploadList, setShowUploadList] = useState(false);

  const [appSettingForm] = Form.useForm<{ settingTitle: string }>();

  useEffect(() => {
    setTimeout(() => {
      setAppSettingConfig((prevState) => {
        return { ...prevState, loading: false };
      });
    }, 1000);
  }, []);

  // 用户设置网站的配置
  const handleAppSetting = () => {
    // setLoadingState(true);
    console.log(
      'data ==>',
      appSettingForm.getFieldsValue([
        'systemTitle',
        'systemIcon',
        'systemSupportLanguage',
        'systemLanguage',
        'systemThemeColor',
        'systemNavigationBarPreferences',
        'systemSidebarPreferences',
      ]),
    );
  };

  // 控制上传
  const handleUploadFile = (file: RcFile) => {
    handleUploadFileModel.runAsync({ file: file }).then((res) => {
      setShowUploadList(true);
      // 设置系统图标
      appSettingForm.setFieldValue('systemIcon', res?.data?.url);
    });
  };

  const handleBeforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/' ||
      file.type === 'image/jpg';
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isJpgOrPng) {
      message.error('您只能上传JPG/PNG/GIF类型的图片!');
      return false;
    }
    if (!isLt4M) {
      message.error('上传图片大小最多4MB!');
      return false;
    }
    handleUploadFile(file);
    return Upload.LIST_IGNORE;
  };

  /**
   * 自定义上传
   */
  const uploadProps: UploadProps = {
    accept: 'image/png, image/jpeg, image/jpg, image/gif',
    // 是否展示上传的列表
    showUploadList: showUploadList,
    // 手动上传，上传之前的回调
    beforeUpload: (file) => handleBeforeUpload(file),
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
                    height: '100%',
                    minHeight: 'calc(100%)',
                    background: colorBgContainer,
                    position: 'relative',
                  }}
                >
                  <AppSpin
                    spinning={appSettingConfig.loading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      height: '100%',
                    }}
                    spinComponent={<Outlet />}
                  />
                </div>
                <AppSetting onSubmit={handleAppSetting}>
                  <AppSettingForm
                    form={appSettingForm}
                    onFinish={handleAppSetting}
                    uploadProps={uploadProps}
                  />
                </AppSetting>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default AppLayout;
