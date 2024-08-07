import { doc, getDoc } from 'firebase/firestore';

import { db } from '../app';
import { timestampToDate } from '../timestampToDate';

type Props<T> = {
  path: string;
  id: string;
  parseT: (value: { [key: string]: unknown }) => T;
  isWithoutId?: boolean;
};

export const get = async <T>({
  path,
  id,
  parseT,
  isWithoutId,
}: Props<T>): Promise<T> => {
  const snapshot = await getDoc(doc(db, path, id));
  if (!snapshot.exists())
    throw new Error(`There is not specified data: ${path}/${id}`);

  const datum = timestampToDate(snapshot.data());
  if (!isWithoutId) datum.id = snapshot.id;

  try {
    return parseT(datum);
  } catch (error) {
    console.log(`Document: ${path}/${id}`);
    console.error(error);
    throw error;
  }
};
