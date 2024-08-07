import { CSSProperties, ReactNode } from 'react';

export type LabelProps = {
  children: ReactNode;
  color?: string;
  bgColor?: string;
  theme?: 'large';
} & CSSProperties;
