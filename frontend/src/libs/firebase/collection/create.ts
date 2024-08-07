import { collection, doc, setDoc } from 'firebase/firestore';

import { db } from '../app';

type Props<T> = {
  inputData: Omit<T, 'id' | 'createdAt'> & {
    id?: string;
  };
  path: string;
  parseT: (value: { [key: string]: unknown }) => T;
};

export const create = async <T>({
  inputData,
  path,
  parseT,
}: Props<T>): Promise<T> => {
  const collectionRef = collection(db, path);

  const { id = doc(collectionRef).id, ...data } = {
    ...inputData,
  };

  const createdObject: T = parseT({
    id,
    ...inputData,
  });

  await setDoc(doc(collectionRef, id), data);

  return createdObject;
};
