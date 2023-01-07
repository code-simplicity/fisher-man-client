import { CloseOne, HeadsetOne, SettingTwo, System } from '@icon-park/react';
import { Button, Drawer, FloatButton, Space } from 'antd';
import React, { Fragment, useState, type FC } from 'react';
import AppSpin from '../AppSpin/index';
import AppSvgIcon from '../AppSvgIcon/index';
import { IAppSettingProps } from './app-setting';

// TODO：明天继续完善这个组件，包括类型设计这些都和antd这边做一个统一

/**
 * 系统级别的组件
 * @constructor
 */
const AppSetting: FC<IAppSettingProps> = (props) => {
  const {
    appSettingStyle,
    children,
    drawerOkText,
    drawerCloseText,
    colorPrimary,
    floatButtonChildrenList,
    loading,
    drawerContentLoading,
    onSubmit,
    ...otherProps
  } = props;
  // 弹窗的配置，内部自己维护这个状态就行，其他的采用props传递
  const [drawerOpenState, setDrawerOpenState] = useState(false);

  // 取消
  const onCloseDrawer = () => {
    setDrawerOpenState(false);
  };

  return (
    <>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<SettingTwo theme="outline" size="18" />}
      >
        {floatButtonChildrenList?.map((item) => {
          return (
            <Fragment key={item.key}>
              <FloatButton
                onClick={() => item.onChange({ setDrawerOpenState })}
                {...item}
              />
            </Fragment>
          );
        })}
      </FloatButton.Group>
      <Drawer
        {...otherProps}
        closeIcon={
          <AppSvgIcon
            svgIconStyle={{ ...appSettingStyle, color: colorPrimary }}
          >
            <CloseOne theme="outline" size="22" />
          </AppSvgIcon>
        }
        open={drawerOpenState}
        onClose={onCloseDrawer}
        extra={
          <Space>
            <Button onClick={onCloseDrawer}>{drawerCloseText}</Button>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              onClick={onSubmitSetting}
            >
              {drawerOkText}
            </Button>
          </Space>
        }
        destroyOnClose={true}
      >
        <AppSpin
          spinning={drawerContentLoading}
          spinComponent={children}
        ></AppSpin>
      </Drawer>
    </>
  );
};

// 设置默认值
AppSetting.defaultProps = {
  drawerCloseText: '关闭',
  drawerOkText: '确认',
  width: 'calc(38vw)',
  colorPrimary: '#e82b2b',
  // 是否展示遮罩
  mask: true,
  // 点击遮罩是否可以关闭
  maskClosable: false,
  // 按钮提交的loading
  loading: false,
  // 侧拉内容区的loading状态
  drawerContentLoading: false,
  floatButtonChildrenList: [
    {
      key: 'fisher-man-system',
      icon: <System theme="outline" size="18" />,
      type: 'primary',
      tooltip: '摸鱼君-系统设置',
      onChange: ({ setDrawerOpenState }) => {
        // 打开弹窗的回调
        setDrawerOpenState(true);
      },
    },
    {
      key: 'fisher-man-customer-service',
      icon: <HeadsetOne theme="outline" size="18" />,
      type: 'primary',
      tooltip: '摸鱼君-客服中心',
      onChange: ({ data }) => {
        console.log('data', data);
      },
    },
  ],
};

export default AppSetting;
