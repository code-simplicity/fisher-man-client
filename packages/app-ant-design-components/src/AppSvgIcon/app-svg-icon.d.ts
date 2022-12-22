import { ReactNode } from 'react';

export interface IAppSvgIconProps {
  children?: ReactNode;
  svgIconStyle?: Properties<string | number, string & Record<string, unknown>>;
}
