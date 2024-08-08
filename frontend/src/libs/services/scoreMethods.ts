import { Item } from '@/types/firestore/item.types';
import { itemsRepository, shelterRepository } from '../repository/firebase';

// Gets Ideal Amount
export const getIdealAmount = ({ capacity }: { capacity: number }): Item => {
  const idealAmount: Item = {
    // 一日過ごすのに必要な物資量？
    food: 4 * capacity,
    water: 2 * capacity,
    blanket: 1 * capacity,
    phone: 0.04 * capacity, //1 per 25 ppl
    flashlight: 0.25 * capacity, //1 per 4 ppl
    television: 0.02 * capacity, //1 per 50ppl
    fan: 0.25 * capacity, //1 per 4 ppl
    generator: 0.05 * capacity, // 1 per 20 ppl
    tent: 0.02 * capacity, //1 per 50 ppl
    heatPack: 2 * capacity,
    megaphone: 0.05 * capacity, //1 per 20 ppl
  };

  return idealAmount;
};

export const getMissingAmount = async ({
  shelterId,
}: {
  shelterId: string;
}): Promise<Item | undefined> => {
  const shelterData = await shelterRepository.get({ id: shelterId });
  if (!shelterData) {
    return undefined;
  }
  const totalItem = await itemsRepository({ shelterId }).get();
  if (!totalItem) {
    return undefined;
  }

  const idealItem = getIdealAmount({ capacity: shelterData.capacity });

  const missingAmount: Item = {
    food: Math.max(0, idealItem.food - totalItem.food),
    water: Math.max(0, idealItem.water - totalItem.water),
    blanket: Math.max(0, idealItem.blanket - totalItem.blanket),
    phone: Math.max(0, idealItem.phone - totalItem.phone),
    flashlight: Math.max(0, idealItem.flashlight - totalItem.flashlight),
    television: Math.max(0, idealItem.television - totalItem.television),
    fan: Math.max(0, idealItem.fan - totalItem.fan),
    generator: Math.max(0, idealItem.generator - totalItem.generator),
    tent: Math.max(0, idealItem.tent - totalItem.tent),
    heatPack: Math.max(0, idealItem.heatPack - totalItem.heatPack),
    megaphone: Math.max(0, idealItem.megaphone - totalItem.megaphone),
  };

  return missingAmount;
};

const itemWeights = {
  food: 1.5,
  water: 2,
  blanket: 1.5,
  phone: 0.5,
  flashlight: 0.8,
  television: 0.3,
  fan: 0.5,
  generator: 1,
  tent: 0.7,
  heatPack: 1,
  megaphone: 0.4,
};

export const calculateScore = ({
  items,
  capacity,
}: {
  items: Item;
  capacity: number;
}): number => {
  let totalMissing = 0;
  let totalIdeal = 0;

  const idealItems = getIdealAmount({ capacity });

  const itemKeys = Object.keys(idealItems) as (keyof Item)[];
  for (const item of itemKeys) {
    totalMissing +=
      Math.max(0, idealItems[item] - items[item]) * (itemWeights[item] || 1);
    totalIdeal += idealItems[item] * (itemWeights[item] || 1);
  }

  const missingRatio = totalMissing / totalIdeal;
  const score = 5 - missingRatio * 5;

  return Math.max(0, Math.min(5, parseFloat(score.toFixed(1))));
};
