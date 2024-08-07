import { CSSProperties, ReactNode } from 'react';

export type FlexBoxProps = {
  id?: string;
  children?: ReactNode;
  className?: string;
  onClick?: JSX.IntrinsicElements['div']['onClick'];
  onScroll?: JSX.IntrinsicElements['div']['onScroll'];
} & CSSProperties;
