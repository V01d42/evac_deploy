import { FIRESTORE_COLLECTION_NAME } from '@/constants/firestore';

export type FirestoreCollectionName =
  (typeof FIRESTORE_COLLECTION_NAME)[keyof typeof FIRESTORE_COLLECTION_NAME];
export type FirestoreDocumentPath =
  | `${FirestoreCollectionName}/${string}`
  | `${FirestoreCollectionName}/${string}/${FirestoreCollectionName}/${string}`
  | `${FirestoreCollectionName}/${string}/${FirestoreCollectionName}/${string}/${FirestoreCollectionName}/${string}`;
export type FirestoreCollectionPath =
  | FirestoreCollectionName
  | `${FirestoreCollectionName}/${string}/${FirestoreCollectionName}`
  | `${FirestoreCollectionName}/${string}/${FirestoreCollectionName}/${string}/${FirestoreCollectionName}`;
