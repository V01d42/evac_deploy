import { Card, FlexBox, Modal, Typography } from '@/components/common';
import { useModalContext } from '@/context/modal.context';
import { getModalData, getModalText } from '@/libs/services/getModalData';

import styles from './ScoreModal.module.scss';

const ScoreModal = () => {
  const { modalData, setModalData } = useModalContext();
  const data = getModalData({
    score: modalData.score,
    prevScore: modalData.prevScore,
  });
  const text = getModalText({
    score: modalData.score,
    prevScore: modalData.prevScore,
  });

  const onClose = () => {
    setModalData({ score: 0, prevScore: 0, isModalActive: false });
  };

  return (
    <Modal open={modalData.isModalActive} onClose={onClose}>
      <FlexBox
        justifyContent='center'
        alignItems='center'
        className={styles.container}
      >
        <Card className={styles.card}>
          <FlexBox
            justifyContent='center'
            alignItems='center'
            className={styles.imageContainer}
          >
            <img src={data.imageUrl} className={styles.image} alt='画像' />
          </FlexBox>
          <FlexBox
            flexDirection='column'
            gap='6px'
            className={styles.textContainer}
          >
            <Typography fontSize='12px' textAlign='center'>
              あなたの自治体の避難所の評価は前回と比べて、
            </Typography>
            <FlexBox alignItems='center' gap='6px' justifyContent='center'>
              <Typography fontWeight={600} fontSize='40px'>
                {text.number}
              </Typography>
              <Typography fontSize='30px' fontWeight={600}>
                {text.text}
              </Typography>
            </FlexBox>
            <Typography fontSize='12px' color='b2' textAlign='center'>
              {data.description}
            </Typography>
          </FlexBox>
        </Card>
      </FlexBox>
    </Modal>
  );
};

export default ScoreModal;
