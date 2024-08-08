import React, { useEffect, useState } from 'react';
import { ScoreModal } from './ScoreModal';
import { useModalContext } from '@/context/modal.context';
import { shelterRepository } from '@/libs/repository/firebase';
import { useAuthContext } from '@/context/auth.context';

const ScorePage: React.FC = () => {
  const { modalData } = useModalContext();
  const { uid } = useAuthContext();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const shelterDatum = await shelterRepository.list([['uid', '==', uid]]);
      const shelterData = shelterDatum[0];
      const score = shelterData.score;
      setScore(score);
    };

    fetchData();
  }, [uid]);

  return (
    <div>
      <h2>Scoreのページ</h2>
      <p>評価は {score}</p>
      {modalData.isModalActive && <ScoreModal />}
    </div>
  );
};

export default ScorePage;
