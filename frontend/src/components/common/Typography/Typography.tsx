import classNames from 'classnames';

import styles from './Typography.module.scss';

import type { TypographyProps } from './Typography.types';

const Typography = (props: TypographyProps) => {
  const {
    children,
    color = 'b1',
    className,
    ellipsis,
    lineNum = 1,
    ...styleProps
  } = props;
  const style = {
    '--color': `var(--${color})`,
    '--line-num': lineNum,
    ...styleProps,
  };

  return (
    <span
      className={classNames(
        styles.root,
        className,
        ellipsis && styles.ellipsis,
        lineNum > 1 && styles.multiLine,
      )}
      style={style}
    >
      {children}
    </span>
  );
};

export default Typography;
