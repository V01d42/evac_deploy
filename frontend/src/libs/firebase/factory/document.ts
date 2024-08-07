import { FirestoreDocumentPath } from '@/types/firestore/FirestorePath.types';

import { create } from '../document/create';
import { get } from '../document/get';
import { update } from '../document/update';

type Repository<T> = {
  get: () => ReturnType<typeof get<T>>;
  create: (inputData: Omit<T, 'createdAt'>) => ReturnType<typeof create<T>>;
  update: (inputData: Partial<T>) => ReturnType<typeof update<T>>;
};

type CreateRepositoryProps<T> = {
  path: FirestoreDocumentPath;
  parseT: (value: { [key: string]: any }) => T;
};

export const createRepository = <T>({
  path,
  parseT,
}: CreateRepositoryProps<T>): Repository<T> => ({
  get: () => get<T>({ path, parseT }),
  create: (inputData) => create<T>({ path, parseT, inputData }),
  update: (inputData) => update<T>({ path, ...inputData }),
});
