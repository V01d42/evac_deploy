import { itemsRepository, shelterRepository } from '@/libs/repository/firebase';
import { FormValue } from '@/types/form/form.types';
import { generateId } from '@/utils/generateId';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

export const useButtonUnit = () => {
  const processing = useRef(false);
  const { handleSubmit } = useFormContext<FormValue>();

  const onSubmit = async (formData: FormValue) => {
    if (processing.current) return;
    processing.current = true;
    // submitする処理
    console.log(formData);

    // scoreを算出する関数をここに
    // 住所からcoordinatesを算出する関数をここに

    const shelterId = generateId();

    await shelterRepository.create({
      id: shelterId,
      name: formData.name,
      address: formData.address,
      capacity: formData.capacity,
      uid: 'aaa', // contextから取得して割り当てる
      score: 0, // scoreを算出する関数から割り当てる
      coordinates: {
        longitude: 0, // 住所からcoordinatesを算出する関数から割り当てる
        latitude: 0, // 住所からcoordinatesを算出する関数から割り当てる
      },
    });
    await itemsRepository({ shelterId }).create({
      food: formData.items.food,
      water: formData.items.water,
      blanket: formData.items.blanket,
      phone: formData.items.phone,
      flashlight: formData.items.flashlight,
      television: formData.items.television,
      fan: formData.items.fan,
      generator: formData.items.generator,
      tent: formData.items.tent,
      heatPack: formData.items.heatPack,
      megaphone: formData.items.megaphone,
    });
  };

  const submitHandler = handleSubmit((data) => onSubmit(data));

  const backHandler = () => {};

  return {
    submitHandler,
    backHandler,
  };
};
