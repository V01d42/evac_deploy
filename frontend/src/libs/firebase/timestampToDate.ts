import { Timestamp } from 'firebase/firestore';

const toDate = (value: Timestamp): Date => value.toDate();

export const timestampToDate = (rawData: { [key: string]: any }) => {
  const data: { [key: string]: unknown } = {};
  Object.keys(rawData).forEach((key) => {
    const value: unknown = key in rawData ? rawData[key] : undefined;
    data[key] = value instanceof Timestamp ? toDate(value) : value;
  });
  return data;
};
