import { Item } from '@/types/firestore/item.types';
import { itemsRepository, shelterRepository } from '../repository/firebase';

// Gets # of Megaphone
export const getItems = async (shelterId: string): Promise<Item | undefined> => {
  const items = await itemsRepository({ shelterId }).get();
  return items;
};

// Gets Shelter capacity
export const getShelterCapacity = async (shelterId: string): Promise<number | undefined> => {
  const shelter = await shelterRepository.get({ id: shelterId });
  return shelter?.capacity;
};

// Gets Ideal Amount
export const getIdealAmount = async (shelterId: string): Promise<Item | undefined> => {
  const capacity = await getShelterCapacity(shelterId);
  if (capacity === undefined) {
    return undefined;
  }


  const factor = 5;


  const idealAmount: Item = {
    food: capacity * factor,
    water: capacity * factor,
    blanket: capacity * factor,
    phone: capacity * factor,
    flashlight: capacity * factor,
    television: capacity * factor,
    fan: capacity * factor,
    generator: capacity * factor,
    tent: capacity * factor,
    heatPack: capacity * factor,
    megaphone: capacity * factor,
  };

  return idealAmount;
};

export const missingAmount = async (shelterId: string): Promise<Partial<Item> | undefined> => {
    const totalItem = await getItems(shelterId);
    if (totalItem === undefined) {
      return undefined;
    }
    const idealItem = await getIdealAmount(shelterId);
    if (idealItem === undefined) {
      return undefined;
    }
  
    const missingAmount: Partial<Item> = {};
  
    if (idealItem.food - totalItem.food > 0) missingAmount.food = idealItem.food - totalItem.food;
    if (idealItem.water - totalItem.water > 0) missingAmount.water = idealItem.water - totalItem.water;
    if (idealItem.blanket - totalItem.blanket > 0) missingAmount.blanket = idealItem.blanket - totalItem.blanket;
    if (idealItem.phone - totalItem.phone > 0) missingAmount.phone = idealItem.phone - totalItem.phone;
    if (idealItem.flashlight - totalItem.flashlight > 0) missingAmount.flashlight = idealItem.flashlight - totalItem.flashlight;
    if (idealItem.television - totalItem.television > 0) missingAmount.television = idealItem.television - totalItem.television;
    if (idealItem.fan - totalItem.fan > 0) missingAmount.fan = idealItem.fan - totalItem.fan;
    if (idealItem.generator - totalItem.generator > 0) missingAmount.generator = idealItem.generator - totalItem.generator;
    if (idealItem.tent - totalItem.tent > 0) missingAmount.tent = idealItem.tent - totalItem.tent;
    if (idealItem.heatPack - totalItem.heatPack > 0) missingAmount.heatPack = idealItem.heatPack - totalItem.heatPack;
    if (idealItem.megaphone - totalItem.megaphone > 0) missingAmount.megaphone = idealItem.megaphone - totalItem.megaphone;
  
    return missingAmount;
};
  

export const calculateScore = async (shelterId: string): Promise<number> => {
    const totalItem = await getItems(shelterId);
    if (totalItem === undefined) {
      return 0; 
    }
    const idealItem = await getIdealAmount(shelterId);
    if (idealItem === undefined) {
      return 0; 
    }
  
    let totalMissing = 0;
    let totalIdeal = 0;
  
    const items = Object.keys(idealItem) as (keyof Item)[];
    for (const item of items) {
      totalMissing += Math.max(0, idealItem[item] - totalItem[item]);
      totalIdeal += idealItem[item];
    }
  
    const missingRatio = totalMissing / totalIdeal;
    const score = 5 - (missingRatio * 5);
  
    return Math.max(0, Math.min(5, parseFloat(score.toFixed(1))));
  };
