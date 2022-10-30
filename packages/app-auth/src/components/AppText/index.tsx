import { injectIntl } from '@@/plugin-locale';
import { ComponentsProps } from '@/pages/Login/interface';
import { FC } from 'react';
import './index.less';
import { Space } from 'antd';

interface AppTextProps extends ComponentsProps {
  text?: string;
  className?: string;
}

const prefixCls = 'app-text-container';

// 文本组件
const AppText: FC<AppTextProps> = (props) => {
  const { intl, text } = props;
  return (
    <Space>
      <span className={`${prefixCls}`}>{text}</span>
    </Space>
  );
};

export default injectIntl(AppText);
