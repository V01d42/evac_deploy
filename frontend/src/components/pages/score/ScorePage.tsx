import React, { useEffect, useState } from 'react';
import { ButtonUnit } from './ButtonUnit';
import { SouhyoUnit } from './SouhyoUnit';
import { ScoreUnit } from './ScoreUnit';
import { RecommendUnit } from './RecommendUnit';

import { ScoreModal } from './ScoreModal';
import { useModalContext } from '@/context/modal.context';
import { shelterRepository } from '@/libs/repository/firebase';
import { useAuthContext } from '@/context/auth.context';

import { Item } from '@/types/firestore/item.types';
import { getMissingAmount } from '@/libs/services/scoreMethods';

const ScorePage: React.FC = () => {
  const { modalData } = useModalContext();
  const { uid } = useAuthContext();
  const [score, setScore] = useState(0);
  const [missingData, setItemAmout] = useState<Item | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const shelterDatum = await shelterRepository.list([['uid', '==', uid]]);
      const shelterData = shelterDatum[0];
      const shelterId = shelterData.id;
      const score = shelterData.score;
      setScore(score);

      const missingData = await getMissingAmount({ shelterId });
      if (missingData) {
        setItemAmout(missingData);
      } else {
        console.error('Missing amount data not found.');
        setItemAmout(null);
      }
    };

    fetchData();
  }, [uid]);

  return (
    <div>
      {modalData.isModalActive && <ScoreModal />}
      <ScoreUnit scoreNum={score} />
      <SouhyoUnit missingData={missingData} />
      <RecommendUnit missingData={missingData} />
      <ButtonUnit linkTo='/form' linkText='在庫を入力し直す' />
    </div>
  );
};

export default ScorePage;
