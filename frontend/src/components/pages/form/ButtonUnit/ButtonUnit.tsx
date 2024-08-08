import { Button, FlexBox } from '@/components/common';

import styles from './ButtonUnit.module.scss';
import { useButtonUnit } from './ButtonUnit.hooks';

const ButtonUnit = () => {
  const { backHandler, submitHandler } = useButtonUnit();

  return (
    <FlexBox gap='24px' justifyContent='center' className={styles.container}>
      <div className={styles.bg} />
      <Button theme='rectOutlineWhite' size='medium' onClick={backHandler}>
        ログイン画面に戻る
      </Button>
      <Button theme='rectRed' size='medium' onClick={submitHandler}>
        評価を見る
      </Button>
    </FlexBox>
  );
};

export default ButtonUnit;
