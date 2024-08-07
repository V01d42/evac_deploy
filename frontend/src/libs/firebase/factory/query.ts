import {
  Query,
  WhereFilterOp,
  query,
  where,
  orderBy,
  startAt,
  startAfter,
  endBefore,
  endAt,
  limit,
  CollectionReference,
} from 'firebase/firestore';

export type FieldKey<T> = keyof T extends string ? keyof T : never;

type ElementType<T> = T extends (infer U)[] ? U : never;

export type FilterQuery<T> = [
  FieldKey<T>,
  WhereFilterOp,
  T[keyof T] | T[keyof T][] | ElementType<T[keyof T]>,
];

type QueryOption<T> = {
  startAt?: T[keyof T];
  startAfter?: T[keyof T];
  endBefore?: T[keyof T];
  endAt?: T[keyof T];
  limit?: number;
};

export type OrderByQuery<T> = [FieldKey<T>, 'asc' | 'desc', QueryOption<T>];

export type CustomQueryConstraint<T> = FilterQuery<T> | OrderByQuery<T>;

export const queryRef = <T>(
  collectionRef: CollectionReference,
  queries: CustomQueryConstraint<T>[],
): Query => {
  let ref: Query = query(collectionRef);
  queries.forEach((queryConstraint) => {
    if (queryConstraint[1] === 'asc' || queryConstraint[1] === 'desc') {
      const [orderByField, direction, option] =
        queryConstraint as OrderByQuery<T>;
      ref = query(ref, orderBy(orderByField, direction));

      if (option) {
        if (option.startAt) {
          ref = query(ref, startAt(option.startAt));
        }
        if (option.startAfter) {
          ref = query(ref, startAfter(option.startAfter));
        }
        if (option.endBefore) {
          ref = query(ref, endBefore(option.endBefore));
        }
        if (option.endAt) {
          ref = query(ref, endAt(option.endAt));
        }
        if (option.limit) {
          ref = query(ref, limit(option.limit));
        }
      }
    } else {
      const [field, opStr, value] = queryConstraint as FilterQuery<T>;
      ref = query(ref, where(field, opStr, value));
    }
  });
  return ref;
};
