import { collection, getDocs } from 'firebase/firestore';

import { db } from '../app';
import { CustomQueryConstraint, queryRef } from '../factory/query';
import { timestampToDate } from '../timestampToDate';

type Props<T> = {
  path: string;
  parseT: (value: { [key: string]: unknown }) => T;
  queryConstraints?: CustomQueryConstraint<T>[];
};

export const list = async <T>({
  path,
  parseT,
  queryConstraints = [],
}: Props<T>): Promise<T[]> => {
  const { docs } = await getDocs(
    queryRef(collection(db, path), queryConstraints),
  );
  const data: T[] = [];
  docs.forEach((queryDocumentSnapshot) => {
    const datum = {
      id: queryDocumentSnapshot.id,
      ...timestampToDate(queryDocumentSnapshot.data()),
    };
    try {
      data.push(parseT(datum));
    } catch (error) {
      console.log(`Document: ${path}/${datum.id}`);
      console.error(error); // TODO: 不要かも
    }
  });
  return data;
};
