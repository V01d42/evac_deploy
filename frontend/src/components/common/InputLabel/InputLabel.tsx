import { FlexBox } from '../FlexBox';
import { Label } from '../Label';
import { Typography } from '../Typography';

import styles from './InputLabel.module.scss';
import { InputLabelProps } from './InputLabel.types';

const InputLabel = (props: InputLabelProps) => {
  const { label, required, color, id } = props;

  return (
    <label htmlFor={id} className={styles.label}>
      <FlexBox alignItems='center' marginBottom='6px' width='100%' gap='8px'>
        {typeof label === 'string' || typeof label === 'number' ? (
          <Typography fontSize='12px' fontWeight={600} color={color}>
            {label}
          </Typography>
        ) : (
          label
        )}
        {required ? (
          <Label
            height='16px'
            padding='0 8px'
            fontSize='10px'
            color='w1'
            bgColor='red1'
            fontWeight={600}
          >
            必須
          </Label>
        ) : (
          <Label height='16px' padding='0 8px' fontSize='10px' fontWeight={600}>
            任意
          </Label>
        )}
      </FlexBox>
    </label>
  );
};
export default InputLabel;
