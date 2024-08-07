import { CSSProperties, ReactNode } from 'react';

export type InputLabelProps = {
  label: ReactNode;
  required?: boolean;
  color?: CSSProperties['color'];
} & JSX.IntrinsicElements['label'];
