import classNames from 'classnames';

import { FlexBox } from '../FlexBox';

import styles from './Modal.module.scss';
import { ModalProps } from './Modal.types';

const Modal = ({ open, onClose, children }: ModalProps) => {
  return (
    <FlexBox
      className={classNames(
        open ? styles.containerOpen : styles.containerClose,
      )}
    >
      <FlexBox onClick={onClose} className={styles.closeButton}>
        <span />
        <span />
      </FlexBox>
      <div onClick={onClose} className={styles.backdrop} />
      <div className={styles.content}>{children}</div>
    </FlexBox>
  );
};

export default Modal;
