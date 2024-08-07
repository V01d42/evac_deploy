import { useFormContext } from 'react-hook-form';

import { FlexBox, Input, Typography } from '@/components/common';

import { FormValue } from '@/types/form/form.types';

import styles from './ItemsInputUnit.module.scss';

const ItemsInputUnit = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValue>();

  return (
    <FlexBox flexDirection='column' gap='24px' className={styles.container}>
      <div className={styles.bg} />
      <FlexBox justifyContent='center'>
        <Typography fontWeight={600} fontSize='20px' color='red1'>
          在庫情報入力
        </Typography>
      </FlexBox>
      <FlexBox gap='24px' className={styles.inputContainer}>
        <Input
          label='食料(食分)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.food')}
          error={errors['items']?.['food']?.message}
        />
        <Input
          label='飲料水(本)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.water')}
          error={errors['items']?.['water']?.message}
        />
        <Input
          label='毛布(枚)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.blanket')}
          error={errors['items']?.['blanket']?.message}
        />
        <Input
          label='公衆電話(台)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.phone')}
          error={errors['items']?.['phone']?.message}
        />
        <Input
          label='懐中電灯(個)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.flashlight')}
          error={errors['items']?.['flashlight']?.message}
        />
        <Input
          label='テレビ(台)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.television')}
          error={errors['items']?.['television']?.message}
        />
        <Input
          label='扇風機(台)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.fan')}
          error={errors['items']?.['fan']?.message}
        />
        <Input
          label='発電機(台)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.generator')}
          error={errors['items']?.['generator']?.message}
        />
        <Input
          label='テント(基)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.tent')}
          error={errors['items']?.['tent']?.message}
        />
        <Input
          label='使い捨てカイロ(個)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.heatPack')}
          error={errors['items']?.['heatPack']?.message}
        />
        <Input
          label='メガホン(個)'
          required
          width='calc((100% - 24px) / 2)'
          className={styles.input}
          {...register('items.megaphone')}
          error={errors['items']?.['megaphone']?.message}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ItemsInputUnit;
