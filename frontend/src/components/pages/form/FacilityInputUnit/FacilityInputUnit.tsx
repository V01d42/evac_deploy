import { useFormContext } from 'react-hook-form';

import { FlexBox, Input, Typography } from '@/components/common';

import { FormValue } from '@/types/form/form.types';

import styles from './FacilityInputUnit.module.scss';

const FacilityInputUnit = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValue>();

  return (
    <FlexBox flexDirection='column' gap='24px' className={styles.container}>
      <FlexBox justifyContent='center'>
        <Typography fontWeight={600} fontSize='20px' color='red1'>
          施設情報入力
        </Typography>
      </FlexBox>
      <FlexBox gap='24px' flexDirection='column'>
        <Input
          label='施設名'
          required
          {...register('name')}
          error={errors['name']?.message}
        />
        <Input
          label='住所'
          required
          {...register('address')}
          error={errors['address']?.message}
        />
        <Input
          label='収容人数(人)'
          required
          {...register('capacity')}
          error={errors['capacity']?.message}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default FacilityInputUnit;
