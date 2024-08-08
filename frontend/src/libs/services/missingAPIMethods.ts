import { Item } from '@/types/firestore/item.types';
import {
  ApiResponseSchema,
  MissingItemResult,
  RakutenItem,
} from '@/types/rakuten/rakuten';

type ItemDictionary = {
  [key: string]: { name: string; genreId: number };
};

async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
): Promise<T | undefined> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // エクスポネンシャルバックオフ
      } else {
        console.error('Max retries reached', error);
        return undefined;
      }
    }
  }
}

const itemDictionary: ItemDictionary = {
  food: { name: '非常食品', genreId: 100227 },
  water: { name: '水', genreId: 201351 },
  blanket: { name: '毛布', genreId: 215566 },
  phone: { name: '電話', genreId: 565004 },
  flashlight: { name: '懐中電灯', genreId: 101070 },
  television: { name: 'テレビ', genreId: 211742 },
  fan: { name: '扇風機', genreId: 562637 },
  generator: { name: '発電機', genreId: 101070 },
  tent: { name: 'テント', genreId: 101070 },
  heatPack: { name: 'カイロ', genreId: 551176 },
  megaphone: { name: 'メガホン', genreId: 112998 },
};

const appId = '1097554411296396228';
const reqUrl =
  'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601';

export const getRakutenItem = async ({
  keyword,
  genreId,
}: {
  keyword: string;
  genreId: number;
}): Promise<RakutenItem[] | undefined> => {
  return retry(
    async () => {
      const response = await fetch(
        `${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`,
      );

      if (response.ok) {
        const data = await response.json();
        const result = ApiResponseSchema.safeParse(data);
        if (result.success) {
          const items: RakutenItem[] = result.data.Items.map(
            (itemWrapper) => itemWrapper.Item,
          );
          return items;
        } else {
          console.error('Validation failed', result.error);
          return undefined;
        }
      } else {
        console.error(
          'Response was not ok',
          response.status,
          response.statusText,
        );
        if (response.status === 429) {
          throw new Error('Rate limit exceeded');
        }
        return undefined;
      }
    },
    3,
    1000,
  ); // 3回のリトライ、初回待機時間1秒
};

export const getMissingItems = async ({
  missingData,
}: {
  missingData: Item;
}): Promise<MissingItemResult[] | undefined> => {
  const missingItemPromises = Object.entries(missingData).map(
    async ([key, quantity]) => {
      if (quantity > 0) {
        const { name, genreId } = itemDictionary[key];
        const items = await getRakutenItem({ keyword: name, genreId });
        if (items) {
          return { name, items };
        }
      }
      return undefined;
    },
  );

  try {
    const missingItems = await Promise.all(missingItemPromises);
    return missingItems.filter(
      (item) => item !== undefined,
    ) as MissingItemResult[];
  } catch (error) {
    console.error('Failed to fetch missing items', error);
    return undefined;
  }
};
