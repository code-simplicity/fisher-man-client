import React, { FC } from 'react';
import { ComponentsProps } from '@/pages/Login/interface';
import { injectIntl } from '@@/plugin-locale';
import { Col, Divider, Row, Tooltip } from 'antd';
import {
  GithubFilled,
  GooglePlusOutlined,
  QqCircleFilled,
  WechatFilled,
  WeiboCircleFilled,
} from '@ant-design/icons';
import './index.less';

interface OtherLoginModeProps extends ComponentsProps {}

// 其他登陆方式
const OtherLoginMode: FC<OtherLoginModeProps> = ({ intl }) => {
  return (
    <>
      <Divider plain>
        <h4>{intl.formatMessage({ id: 'otherWaysToLogIn' })}</h4>
      </Divider>
      <Row justify="space-between">
        <Col span={6}>
          <Tooltip title={intl.formatMessage({ id: 'wechat' })}>
            <div className={`other-login-mode`}>
              <WechatFilled className="text-2xl" style={{ color: '#07C160' }} />
            </div>
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip title={intl.formatMessage({ id: 'github' })}>
            <div className={`other-login-mode`}>
              <GithubFilled className="text-2xl" style={{ color: '#000000' }} />
            </div>
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip title={intl.formatMessage({ id: 'qq' })}>
            <div className={`other-login-mode`}>
              <QqCircleFilled
                className="text-2xl"
                style={{ color: '#50C8FD' }}
              />
            </div>
          </Tooltip>
        </Col>
        <Col span={6}>
          <Tooltip title={intl.formatMessage({ id: 'weibo' })}>
            <div className={`other-login-mode`}>
              <WeiboCircleFilled
                className="text-2xl"
                style={{ color: '#FB6622' }}
              />
            </div>
          </Tooltip>
        </Col>
      </Row>
    </>
  );
};

export default injectIntl(OtherLoginMode);
