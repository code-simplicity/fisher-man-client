import { injectIntl } from '@@/plugin-locale';
import { FC } from 'react';
import { getDistance } from '@/components/AppPointBackground/GridLayout';
import TweenOne from 'rc-tween-one';
import './index.less';
import { AppPointBackgroundType } from './interface';

type AppPointProps = AppPointBackgroundType;

// 圆点
const AppPoint: FC<AppPointProps> = (props: AppPointProps) => {
  const { tx, ty, x, y, opacity, background, radius } = props;
  let transform;
  let zIndex = 0;
  let animation: {
    duration: number;
    yoyo: boolean;
    repeat: number;
    delay?: number;
    y: number;
  } = {
    y: (Math.random() * 2 - 1) * 20 || 15,
    duration: 3000,
    delay: Math.random() * 1000,
    yoyo: true,
    repeat: -1,
  };
  if (tx && ty) {
    if (tx !== x && ty !== y) {
      const distance = getDistance({ x, y }, { x: tx, y: ty });
      const g = Math.sqrt(2000000 / (0.1 * distance * distance));
      transform = `translate(${(g * (x - tx)) / distance}px, ${
        (g * (y - ty)) / distance
      }px)`;
    } else if (tx === x && ty === y) {
      transform = `scale(${80 / radius})`;
      animation = { y: 0, yoyo: false, repeat: 0, duration: 300 };
      zIndex = 1;
    }
  }
  return (
    <div
      style={{
        left: x - radius,
        top: y - radius,
        width: radius * 1.8,
        height: radius * 1.8,
        opacity,
        zIndex,
        transform,
      }}
      {...props}
    >
      <TweenOne
        animation={animation}
        style={{
          background: background,
        }}
        className={`${props.className}-child`}
      />
    </div>
  );
};

export default injectIntl(AppPoint);
