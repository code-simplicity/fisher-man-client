import { CloseOne, HeadsetOne, SettingTwo, System } from '@icon-park/react';
import { Button, Drawer, FloatButton, Space } from 'antd';
import React, { Fragment, useState, type FC } from 'react';
import AppSvgIcon from '../AppSvgIcon/index';
import { IAppSettingProps } from './app-setting';

// TODO：明天继续完善这个组件，包括类型设计这些都和antd这边做一个统一

/**
 * 系统级别的组件
 * @constructor
 */
const AppSetting: FC<IAppSettingProps> = (props) => {
  const {
    toolTipTitle,
    appSettingStyle,
    children,
    drawerOkText,
    drawerCloseText,
    colorPrimary,
    floatButtonChildrenList,
    onSubmit,
    ...otherProps
  } = props;
  // 弹窗的配置
  const [drawerState, setDrawerState] = useState({
    open: false,
  });

  // 取消
  const onCloseDrawer = () => {
    setDrawerState({
      open: false,
    });
  };

  // 确认，发送请求的回调
  const onSubmitSetting = () => {
    onSubmit('1');
  };
  return (
    <>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<SettingTwo theme="outline" size="18" />}
      >
        {floatButtonChildrenList?.length > 0 &&
          floatButtonChildrenList?.map((item) => {
            return (
              <Fragment key={item.key}>
                <FloatButton
                  onClick={() => item.onChange({ setDrawerState })}
                  {...item}
                />
              </Fragment>
            );
          })}
      </FloatButton.Group>
      <Drawer
        closeIcon={
          <AppSvgIcon
            svgIconStyle={{ ...appSettingStyle, color: colorPrimary }}
          >
            <CloseOne theme="outline" size="22" />
          </AppSvgIcon>
        }
        open={drawerState.open}
        mask={true}
        maskClosable={false}
        onClose={onCloseDrawer}
        extra={
          <Space>
            <Button onClick={onCloseDrawer}>{drawerCloseText}</Button>
            <Button type="primary" onClick={onSubmitSetting}>
              {drawerOkText}
            </Button>
          </Space>
        }
        {...otherProps}
      >
        {children}
      </Drawer>
    </>
  );
};

// 设置默认值
AppSetting.defaultProps = {
  drawerCloseText: '关闭',
  drawerOkText: '确认',
  width: 'calc(60vw)',
  toolTipTitle: '摸鱼君-系统设置',
  colorPrimary: '#e82b2b',
  floatButtonChildrenList: [
    {
      key: 'fisher-man-system',
      icon: <System theme="outline" size="18" />,
      type: 'primary',
      tooltip: '摸鱼君-系统设置',
      onChange: ({ setDrawerState }) => {
        // 打开弹窗的回调
        setDrawerState({
          open: true,
        });
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
