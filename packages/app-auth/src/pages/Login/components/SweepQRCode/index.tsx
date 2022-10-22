import React, { FC } from 'react';
import { ComponentsProps } from '@/pages/Login/interface';
import { injectIntl } from '@@/plugin-locale';
import { QRCodeSVG } from 'qrcode.react';
import OtherLoginMode from '../OtherLoginMode';

interface SweepQRCodeProps extends ComponentsProps {}

// 二维码组件
const SweepQRCode: FC<SweepQRCodeProps> = ({ intl }) => {
  return (
    <>
      <div className="flex items-center flex-col justify-center">
        <QRCodeSVG
          value={'https://picturesofpeoplescanningqrcodes.tumblr.com/'}
          size={256}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={'H'}
          includeMargin={true}
        />
        <div className="text-md">
          {intl.formatMessage({
            id: 'sweepTheCodePrompt',
          })}
        </div>
      </div>
      <OtherLoginMode />
    </>
  );
};

export default injectIntl(SweepQRCode);
