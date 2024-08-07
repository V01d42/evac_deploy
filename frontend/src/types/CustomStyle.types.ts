import { CSSProperties } from 'react';

export interface CustomCSSProperties extends CSSProperties {
  '--color'?: string;
  '--bg-color'?: string;
  '--size'?: string;
}
