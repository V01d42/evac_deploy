import { FormProvider } from 'react-hook-form';
import { useFormPage } from './useFormPage.hooks';

import { FlexBox } from '@/components/common';
import { FacilityInputUnit } from '@/components/pages/form/FacilityInputUnit';
import { ItemsInputUnit } from '@/components/pages/form/ItemsInputUnit';
import { ButtonUnit } from '@/components/pages/form/ButtonUnit';

const FirstFormInternal = () => {
  return (
    <FlexBox flexDirection='column'>
      <FacilityInputUnit />
      <ItemsInputUnit />
      <ButtonUnit />
    </FlexBox>
  );
};

const FormPage = () => {
  const { methods } = useFormPage();

  return (
    <FormProvider {...methods}>
      <FirstFormInternal />
    </FormProvider>
  );
};

export default FormPage;
