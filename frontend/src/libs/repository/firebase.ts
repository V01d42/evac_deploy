import {
  FIRESTORE_COLLECTION_NAME,
  FIRESTORE_DOCUMENT_NAME,
} from '@/constants/firestore';

import { createRepository as createCollectionRepository } from '../firebase/factory/collection';
import { createRepository as createDocumentRepository } from '../firebase/factory/document';
import { parseShelter } from '@/types/firestore/shelter.types';
import { parseItem } from '@/types/firestore/item.types';
import { parseUser } from '@/types/firestore/user.types';

export const shelterRepository = createCollectionRepository({
  path: FIRESTORE_COLLECTION_NAME.SHELTER,
  parseT: parseShelter,
});

export const itemsRepository = ({ shelterId }: { shelterId: string }) =>
  createDocumentRepository({
    path: `${FIRESTORE_COLLECTION_NAME.SHELTER}/${shelterId}/${FIRESTORE_COLLECTION_NAME.PRIVATE}/${FIRESTORE_DOCUMENT_NAME.ITEMS}`,
    parseT: parseItem,
  });

export const userRepository = createCollectionRepository({
  path: FIRESTORE_COLLECTION_NAME.USER,
  parseT: parseUser,
});
