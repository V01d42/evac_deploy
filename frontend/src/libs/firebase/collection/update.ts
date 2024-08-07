import { collection, doc, updateDoc } from 'firebase/firestore';

import { db } from '../app';

type Props<T> = {
  path: string;
  id: string;
} & Omit<Partial<T>, 'id'>;

export const update = async <T>({ id, path, ...inputData }: Props<T>) => {
  const collectionRef = collection(db, path);
  await updateDoc(doc(collectionRef, id), { ...inputData });
};
