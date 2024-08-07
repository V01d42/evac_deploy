import { doc, getDoc } from 'firebase/firestore';
import { db } from '../app';

import { timestampToDate } from '../timestampToDate';

type Props<T> = {
  path: string;
  parseT: (value: { [key: string]: unknown }) => T;
};

export const get = async <T>({ path, parseT }: Props<T>): Promise<T> => {
  const snapshot = await getDoc(doc(db, path));
  if (!snapshot.exists())
    throw new Error(`There is not specified data: ${path}`);

  const datum = timestampToDate(snapshot.data());

  try {
    return parseT(datum);
  } catch (error) {
    console.log(`Document: ${path}`);
    console.error(error);
    throw error;
  }
};
