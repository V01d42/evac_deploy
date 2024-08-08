import { useEffect, useState } from 'react';
import styles from './RecommendUnit.module.scss';
import { RecommendUnitProps } from './RecommendUnit.types';
import { getMissingItems } from '@/libs/services/missingAPIMethods';
import { MissingItemResult } from '@/types/rakuten/rakuten';
import { FlexBox, Typography } from '@/components/common';
import { digitSeparator } from '@/utils/digitSeparator';

const RecommendUnit = ({ missingData }: RecommendUnitProps) => {
  const [items, setItems] = useState<MissingItemResult[]>();

  useEffect(() => {
    if (missingData) {
      const fetchData = async () => {
        const data = await getMissingItems({ missingData });
        setItems(data);
      };

      fetchData();
    }
  }, [missingData]);

  return (
    <FlexBox flexDirection='column' gap='20px' className={styles.container}>
      <div className={styles.bg} />
      <FlexBox flexDirection='column' className={styles.titleContainer}>
        <Typography fontSize='30px' fontWeight={600} textAlign='center'>
          おすすめ商品
        </Typography>
        <Typography fontSize='12px' textAlign='center'>
          楽天市場よりおすすめ商品を購入できます。
        </Typography>
      </FlexBox>
      {items ? (
        <FlexBox gap='20px' flexDirection='column'>
          {items.map((item) => {
            return (
              <FlexBox key={item.name} gap='12px' flexDirection='column'>
                <Typography fontWeight={600} fontSize='20px'>
                  {item.name}
                </Typography>
                <FlexBox gap='8px' className={styles.imagesContainer}>
                  {item.items.map((product) => {
                    return (
                      <a href={product.itemUrl} target='_blank'>
                        <FlexBox
                          gap='8px'
                          flexDirection='column'
                          className={styles.itemContainer}
                        >
                          <FlexBox className={styles.imageContainer}>
                            <img
                              src={product.mediumImageUrls[0].imageUrl}
                              alt='画像'
                              className={styles.image}
                            />
                          </FlexBox>
                          <FlexBox gap='8px' flexDirection='column'>
                            <Typography fontSize='12px' lineNum={2} ellipsis>
                              {product.itemName}
                            </Typography>
                            <Typography
                              fontWeight={600}
                              fontSize='16px'
                              textAlign='right'
                              color='red1'
                            >
                              ¥{digitSeparator(product.itemPrice)}円
                            </Typography>
                          </FlexBox>
                        </FlexBox>
                      </a>
                    );
                  })}
                </FlexBox>
              </FlexBox>
            );
          })}
        </FlexBox>
      ) : (
        <FlexBox justifyContent='center'>
          <Typography>おすすめ商品はありません</Typography>
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default RecommendUnit;
