import { injectIntl } from '@@/plugin-locale';
import { ComponentsProps } from '@/pages/Login/interface';
import { FC } from 'react';

interface AppPointBackgroundProps extends ComponentsProps {}

// 背景图
const AppPointBackground: FC<AppPointBackgroundProps> = ({ intl }) => {
  return (
    <>
      <div>1</div>
    </>
  );
};

export default injectIntl(AppPointBackground);
