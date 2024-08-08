import classNames from 'classnames';

import styles from './Card.module.scss';

import type { CardProps } from './Card.types';

const Card = (props: CardProps) => {
  const { id, children, fullWidth, onClick, className, ...styleProps } = props;
  return (
    <div
      id={id}
      className={classNames(
        styles.card,
        fullWidth && styles.fullWidth,
        className,
      )}
      onClick={onClick}
      style={{ ...styleProps }}
    >
      {children}
    </div>
  );
};

export default Card;
