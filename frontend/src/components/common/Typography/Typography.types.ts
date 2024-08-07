import { CSSProperties, ReactNode } from 'react';

export type TypographyProps = {
  children: ReactNode;
  color?: string;
  className?: string;
  ellipsis?: boolean;
  lineNum?: number;
} & CSSProperties;
