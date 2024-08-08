import { missingAmount } from './scoreMethods';

// Define the dictionary for item names and genre IDs
type ItemDictionary = {
  [key: string]: { name: string; genreId: number };
};

const itemDictionary: ItemDictionary = {
  food: { name: "非常食品", genreId: 100227 },
  water: { name: "水", genreId: 201351 },
  blanket: { name: "毛布", genreId: 215566 },
  phone: { name: "電話", genreId: 565004 },
  flashlight: { name: "懐中電灯", genreId: 101070 },
  television: { name: "テレビ", genreId: 211742 },
  fan: { name: "扇風機", genreId: 562637 },
  generator: { name: "発電機", genreId: 101070 },
  tent: { name: "テント", genreId: 101070 },
  heatPack: { name: "カイロ", genreId: 551176 },
  megaphone: { name: "メガホン", genreId: 112998 },
};


const fetchRakutenData = async (keyword: string, genreId: number) => {
  const appId = '1097554411296396228'; // Replace with your actual application ID
  const reqUrl = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601';

  const response = await fetch(`${reqUrl}?applicationId=${appId}&format=json&keyword=${keyword}&genreId=${genreId}&hits=5`);
  if (!response.ok) {
    throw new Error('Failed to fetch data from Rakuten API');
  }
  const data = await response.json();
  return data;
};


export const missingAPIMethods = async (shelterId: string): Promise<any[] | undefined> => {
  const missingItems = await missingAmount(shelterId);
  if (!missingItems) {
    return undefined;
  }

  const results: any[] = [];

  for (const item of Object.keys(missingItems)) {
    if (item in itemDictionary) {
      const { name, genreId } = itemDictionary[item];
      const rakutenData = await fetchRakutenData(name, genreId);
      results.push(rakutenData);
    }
  }

  return results;
};