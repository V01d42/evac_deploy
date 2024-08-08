import {
  itemsRepository,
  shelterRepository,
  userRepository,
} from '@/libs/repository/firebase';
import { generateId } from '@/utils/generateId';
import { useNavigate } from 'react-router';
import { useFormContext } from 'react-hook-form';
import { LoginValue } from '@/types/form/login.types';

export const useSignupPageInternal = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<LoginValue>();

  const onSubmit = async (formData: LoginValue) => {
    const userId = generateId();
    const shelterId = generateId();

    try {
      const existingUser = await userRepository.list([
        ['email', '==', formData.email],
      ]);

      // 重複していないかチェック
      if (existingUser.length) {
        throw new Error('すでにメールアドレスが登録されています。');
      }

      // アカウント作成と同時に初期値データをDBに作成
      await userRepository.create({
        id: userId,
        email: formData.email,
        password: formData.password,
      });
      await shelterRepository.create({
        id: shelterId,
        uid: userId,
        name: '',
        address: '',
        score: 0,
        capacity: 0,
        coordinates: {
          longitude: 0,
          latitude: 0,
        },
      });
      await itemsRepository({ shelterId }).create({
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
      });
      navigate('/login');
    } catch (error) {
      alert(error);
    }
  };

  const submitHandler = handleSubmit((data) => onSubmit(data));
  const navigateToLogin = () => {
    navigate('/login');
  };

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  return {
    emailError,
    passwordError,
    register,
    submitHandler,
    navigateToLogin,
  };
};
