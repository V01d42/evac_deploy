import classNames from 'classnames';

import { CustomCSSProperties } from '@/types/CustomStyle.types';

import styles from './Label.module.scss';
import { LabelProps } from './Label.types';

const Label = ({
  children,
  color = 'b1',
  bgColor = 'w3',
  theme,
  ...styleProps
}: LabelProps) => {
  const style: CustomCSSProperties = {
    '--color': `var(--${color})`,
    '--bg-color': `var(--${bgColor})`,
    ...styleProps,
  };

  return (
    <span
      className={classNames(styles.label, theme && styles[theme])}
      style={style}
    >
      {children}
    </span>
  );
};

export default Label;
