import { z } from 'zod';

export const FormSchema = z.object({
  name: z.string().min(1, '必須項目です'), // 施設名
  address: z.string().min(1, '必須項目です'), // 住所
  capacity: z.preprocess(
    (v) => Number(v),
    z.number().min(0, '正しい形式で入力してください'),
  ), 
  items: z.object({
    food: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // 食料(食分)
    water: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // 飲料水(本)
    blanket: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // 毛布(枚)
    phone: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // 公衆電話(台)
    flashlight: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // 懐中電灯(個)
    television: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // テレビ(台)
    fan: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // 扇風機(台)
    generator: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // 発電機(台)
    tent: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // テント(機)
    heatPack: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // 使い捨てカイロ(個)
    megaphone: z.preprocess(
      (v) => Number(v),
      z.number().min(0, '正しい形式で入力してください'),
    ), // メガホン(個)
  }),
});

export type FormValue = z.infer<typeof FormSchema>;
