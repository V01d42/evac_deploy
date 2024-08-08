import { z } from 'zod';

export type MissingItemResult = {
  name: string;
  items: RakutenItem[];
};

// MediumImageUrlスキーマの定義
export const MediumImageUrlSchema = z.object({
  imageUrl: z.string(),
});

// Itemスキーマの定義
export const ItemSchema = z.object({
  itemName: z.string(),
  itemPrice: z.number(),
  itemUrl: z.string(),
  mediumImageUrls: z.array(MediumImageUrlSchema),
});

// ApiResponseスキーマの定義
export const ApiResponseSchema = z.object({
  Items: z.array(
    z.object({
      Item: ItemSchema,
    }),
  ),
});

// 型のエクスポート
export type MediumImageUrl = z.infer<typeof MediumImageUrlSchema>;
export type RakutenItem = z.infer<typeof ItemSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
