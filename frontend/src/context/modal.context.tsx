import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type modalData = {
  score: number;
  prevScore: number;
  isModalActive: boolean;
};

export const initialValue: modalData = {
  score: 0,
  prevScore: 0,
  isModalActive: false,
};

export const ModalContext = createContext<{
  modalData: modalData;
  setModalData: Dispatch<SetStateAction<modalData>>;
}>({
  modalData: initialValue,
  setModalData: () => {},
});

export const useModalContext = () => {
  const context = useContext(ModalContext);

  return { ...context };
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalData, setModalData] = useState<modalData>(initialValue);

  const value = {
    modalData,
    setModalData,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
