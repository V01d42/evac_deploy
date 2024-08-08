import anger from '@/assets/anger.png';
import joy from '@/assets/joy.png';

export const getModalData = ({
  score,
  prevScore,
}: {
  score: number;
  prevScore: number;
}) => {
  const diff = score - prevScore;
  if (diff > 3) {
    return {
      imageUrl: joy,
      description: '市民はあなたのやり方にとても喜んでいるでしょう！',
    };
  } else if (diff > 1.5) {
    return {
      imageUrl: joy,
      description: '市民の評価は高まりつつあります。この調子で続けましょう！',
    };
  } else if (diff > 0) {
    return {
      imageUrl: joy,
      description: '市民の反応はまずまずです。さらなる改善を目指しましょう。',
    };
  } else if (diff > -1.5) {
    return {
      imageUrl: anger,
      description:
        '市民の期待には応えられていないようです。改善の余地があります。',
    };
  } else if (diff > -3) {
    return {
      imageUrl: anger,
      description:
        '市民はあなたのやり方にうんざりしています。計画の見直しを検討してください。',
    };
  } else {
    return {
      imageUrl: anger,
      description:
        '市民はあなたのやり方に激昂しています。今すぐデモが起きる可能性があります。計画を見直してください。',
    };
  }
};

export const getModalText = ({
  score,
  prevScore,
}: {
  score: number;
  prevScore: number;
}) => {
  const diff = score - prevScore;

  if (diff > 0) {
    return {
      number: Number(diff.toFixed(1)),
      text: '点上がりました！',
    };
  } else {
    return {
      number: Math.abs(Number(diff.toFixed(1))),
      text: '点下がりました...',
    };
  }
};
