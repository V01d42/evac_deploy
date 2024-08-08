import React from 'react';
import { Item } from '@/types/firestore/item.types';
import styles from './SouhyoUnit.module.scss';

interface SouhyoUnitProps {
  missingData: Item | null;
}

interface NameLabels {
  [key: string]: { name: string; genreId: number };
}

const SouhyoUnit: React.FC<SouhyoUnitProps> = ({ missingData }) => {
  if (!missingData) {
    return (
      <div className={styles.score_souhyou}>
        <h2>総評</h2>
        <p>全ての防災用具が十分に備蓄されています</p>
      </div>
    );
  }

  const missingDatas = Object.entries(missingData)
    .filter(([, quantity]) => quantity > 0)
    .map(([name, quantity]) => ({ name, quantity }));
  const nameLabels: NameLabels = {
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

  return (
    <div className={styles.score_souhyou}>
      <h2>総評</h2>
      {missingDatas.map((data) => (
        <p key={data.name}>
          {nameLabels[data.name].name}が{Math.ceil(data.quantity)}個足りません。
        </p>
      ))}
    </div>
  );
};

export default SouhyoUnit;
