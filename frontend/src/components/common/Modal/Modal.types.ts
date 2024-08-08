import { ReactNode } from 'react';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};
