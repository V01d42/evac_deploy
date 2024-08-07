import { forwardRef } from 'react';

import classNames from 'classnames';

import styles from './FlexBox.module.scss';

import type { FlexBoxProps } from './FlexBox.types';

const FlexBox = forwardRef<HTMLDivElement, FlexBoxProps>((props, ref) => {
  const { id, children, className, onClick, onScroll, ...styleProps } = props;
  return (
    <div
      id={id}
      ref={ref}
      className={classNames(styles.flex, className)}
      style={{ ...styleProps }}
      onClick={onClick}
      onScroll={onScroll}
    >
      {children}
    </div>
  );
});

const [displayName] = Object.keys({ FlexBox });
FlexBox.displayName = displayName;

export default FlexBox;
