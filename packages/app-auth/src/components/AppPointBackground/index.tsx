import { injectIntl } from '@@/plugin-locale';
import { FC, useRef, useState } from 'react';
import {
  getDistance,
  getPointPos,
} from '@/components/AppPointBackground/GridLayout';
import AppPoint from '@/components/AppPointBackground/Point';
import './index.less';
import { AppPointBackgroundType } from './interface';

type AppPointBackgroundProps = AppPointBackgroundType;

interface appPointStateType extends AppPointBackgroundProps {
  data: [AppPointBackgroundProps] | any;
}

const prefixCls = 'app-point-background-container';

const num = 100;

// 背景图
const AppPointBackground: FC<AppPointBackgroundProps> = (props) => {
  // @ts-ignore
  const [appPointState, setAppPointState] = useState<appPointStateType>({
    data: getPointPos(1920, 1080, num).map((item) => {
      return {
        ...item,
        opacity: Math.random() * 0.2 + 0.05,
        background: `rgb(${Math.round(Math.random() * 95 + 160)},255,255)`,
      };
    }),
    tx: 0,
    ty: 0,
  });
  const pointRef = useRef<any>();

  const handleMouseLeave = () => {
    setAppPointState({
      ...appPointState,
      tx: 0,
      ty: 0,
    });
  };

  const handleMouseMove = (e: any) => {
    const cX = e.clientX;
    const cY = e.clientY;
    const boxRect = pointRef.current!.getBoundingClientRect();
    const pos = appPointState.data
      .map((item: any) => {
        const { x, y, radius } = item;
        return {
          x,
          y,
          distance:
            getDistance({ x: cX - boxRect.x, y: cY - boxRect.y }, { x, y }) -
            radius,
        };
      })
      .reduce((a: any, b: any) => {
        if (!a.distance || a.distance > b.distance) {
          return b;
        }
        return a;
      });
    if (pos.distance < 60) {
      setAppPointState({
        ...appPointState,
        tx: pos.x,
        ty: pos.y,
      });
    } else {
      handleMouseLeave();
    }
  };

  return (
    <div className={`${prefixCls}`}>
      <div
        className={`${prefixCls}-wrapper`}
        ref={pointRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {appPointState.data.map((item: any, i: number) => {
          return (
            <AppPoint
              {...item}
              tx={appPointState.tx}
              ty={appPointState.ty}
              key={i.toString()}
              className={`${prefixCls}-block`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default injectIntl(AppPointBackground);
