import { useAuthContext } from '@/context/auth.context';
import { useModalContext } from '@/context/modal.context';
import { itemsRepository, shelterRepository } from '@/libs/repository/firebase';
import { fetchGeocode } from '@/libs/services/getCoordinate';
import { FormValue } from '@/types/form/form.types';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const useButtonUnit = () => {
  const processing = useRef(false);
  const { handleSubmit } = useFormContext<FormValue>();
  const { uid, setUid } = useAuthContext();
  const { setModalData } = useModalContext();
  const navigate = useNavigate();

  const onSubmit = async (formData: FormValue) => {
    if (processing.current) return;
    processing.current = true;

    if (uid === '') {
      alert('ログインしていません。ログインし直してください');
      navigate('/login');
      return;
    }

    // scoreを算出する関数をここに
    const coordinate = await fetchGeocode(
      formData.address,
      'jp',
      'ja',
      import.meta.env.VITE_MAPBOX_TOKEN,
    );
    const shelterDatum = await shelterRepository.list([['uid', '==', uid]]);
    const shelterData = shelterDatum[0];
    const prevScore = shelterData.score;
    const shelterId = shelterData.id;
    const isModalActive = prevScore !== 0;

    setModalData({ score: formData.capacity, prevScore, isModalActive });

    await shelterRepository.update(shelterId, {
      name: formData.name,
      address: formData.address,
      capacity: formData.capacity,
      score: formData.capacity, // scoreを算出する関数から割り当てる
      coordinates: {
        longitude: coordinate.longitude,
        latitude: coordinate.latitude,
      },
    });
    await itemsRepository({ shelterId }).update({
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
    navigate('/score');
  };

  const submitHandler = handleSubmit((data) => onSubmit(data));

  const backHandler = () => {
    setUid('');
    navigate('/login');
  };

  return {
    submitHandler,
    backHandler,
  };
};
