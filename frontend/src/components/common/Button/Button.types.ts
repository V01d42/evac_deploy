import { CSSProperties, ReactNode } from 'react';

export type ButtonProps = {
  id?: string;
  className?: string;
  children?: ReactNode;
  theme?: 'rectRed' | 'rectOutlineWhite';
  size?: 'large' | 'medium' | 'none';
  fullWidth?: boolean;
  onClick?: JSX.IntrinsicElements['button']['onClick'];
  type?: JSX.IntrinsicElements['button']['type'];
  disabled?: JSX.IntrinsicElements['button']['disabled'];
} & CSSProperties;
