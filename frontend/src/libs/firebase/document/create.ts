import { doc, setDoc } from 'firebase/firestore';

import { db } from '../app';

type Props<T> = {
  inputData: Omit<T, 'createdAt'>;
  path: string;
  parseT: (value: { [key: string]: unknown }) => T;
};

export const create = async <T>({
  inputData,
  path,
  parseT,
}: Props<T>): Promise<T> => {
  const data = {
    ...inputData,
  };

  const createdObject: T = parseT(inputData);

  await setDoc(doc(db, path), data);

  return createdObject;
};
