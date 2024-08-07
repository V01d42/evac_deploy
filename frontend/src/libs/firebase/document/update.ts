import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../app';

type Props<T> = {
  path: string;
} & Partial<T>;

export const update = async <T>({ path, ...inputData }: Props<T>) => {
  await updateDoc(doc(db, path), { ...inputData });
};
