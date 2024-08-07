import { FormSchema, FormValue } from '@/types/form/form.types';
import { generateId } from '@/utils/generateId';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const useFormPage = () => {
  const methods = useForm<FormValue>({
    resolver: zodResolver(FormSchema),
  });
  const { reset } = methods;

  useEffect(() => {
    const id = generateId();
    const defaultValue: FormValue = {
      id,
      createdAt: new Date(),
      name: '',
      address: '',
      capacity: 0,
      items: {
        food: 0,
        water: 0,
        blanket: 0,
        phone: 0,
        flashlight: 0,
        television: 0,
        fan: 0,
        generator: 0,
        tent: 0,
        heatPack: 0,
        megaphone: 0,
      },
    };

    reset(defaultValue);
  }, []);

  return {
    methods,
  };
};
