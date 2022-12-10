import { ComponentsProps } from '@/pages/Login/interface';

// tx(碰撞体x位置)， ty(碰撞体y位置) x(水平位置) y(垂直位置) opacity(透明度) backgroundColor(背景颜色) radius(圆角)
export interface AppPointBackgroundType extends ComponentsProps {
  tx?: number;
  ty?: number;
  x: number;
  y: number;
  opacity?: number;
  background?: string;
  radius: number;
  className?: string;
}
