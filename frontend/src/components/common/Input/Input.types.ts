import { CSSProperties, ReactNode } from 'react';

export type InputProps = JSX.IntrinsicElements['input'] & {
  label?: ReactNode;
  labelColor?: CSSProperties['color'];
  required?: boolean;
  explanation?: ReactNode;
  hideLabel?: boolean;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
