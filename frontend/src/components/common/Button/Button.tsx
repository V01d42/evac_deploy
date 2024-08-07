import classNames from 'classnames';

import styles from './Button.module.scss';

import type { ButtonProps } from './Button.types';

const Button = (props: ButtonProps) => {
  const {
    id,
    className,
    theme = 'rectRed',
    size = 'medium',
    children,
    fullWidth,
    onClick,
    type = 'button',
    disabled,
    ...styleProps
  } = props;

  return (
    <button
      id={id}
      className={classNames(
        styles[size],
        styles[theme],
        fullWidth && styles['full-width'],
        className,
      )}
      style={{ ...styleProps }}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <span>{children}</span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
