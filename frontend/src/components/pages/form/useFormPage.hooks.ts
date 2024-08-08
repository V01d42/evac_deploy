import { useAuthContext } from '@/context/auth.context';
import { itemsRepository, shelterRepository } from '@/libs/repository/firebase';
import { FormSchema, FormValue } from '@/types/form/form.types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useFormPage = () => {
  const methods = useForm<FormValue>({
    resolver: zodResolver(FormSchema),
  });
  const { reset } = methods;
  const { uid } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const shelterDatum = await shelterRepository.list([['uid', '==', uid]]);
      const shelterData = shelterDatum[0];
      const itemsData =
        (await itemsRepository({ shelterId: shelterData.id }).get()) || {};

      const { name, address, capacity } = shelterData;

      const {
        food = 0,
        water = 0,
        blanket = 0,
        phone = 0,
        flashlight = 0,
        television = 0,
        fan = 0,
        generator = 0,
        tent = 0,
        heatPack = 0,
        megaphone = 0,
      } = itemsData;

      const defaultValue: FormValue = {
        name,
        address,
        capacity,
        items: {
          food,
          water,
          blanket,
          phone,
          flashlight,
          television,
          fan,
          generator,
          tent,
          heatPack,
          megaphone,
        },
      };

      reset(defaultValue);
    };

    fetchData();
  }, [uid, reset]);

  return {
    methods,
  };
};
