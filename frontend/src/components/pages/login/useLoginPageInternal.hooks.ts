import { useAuthContext } from '@/context/auth.context';
import { userRepository } from '@/libs/repository/firebase';
import { LoginValue } from '@/types/form/login.types';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const useLoginPageInternal = () => {
  const { setUid } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<LoginValue>();

  const onSubmit = async (formData: LoginValue) => {
    try {
      // 存在するかチェック
      const existingUser = await userRepository.list([
        ['email', '==', formData.email],
        ['password', '==', formData.password],
      ]);

      // 成功したらcontextに保存しログイン画面に遷移
      if (existingUser.length) {
        setUid(existingUser[0].id);
        alert('ログインに成功しました');
        navigate('/form');
      } else {
        throw new Error('ユーザが存在しません');
      }
    } catch (error) {
      alert(error);
    }
  };

  const submitHandler = handleSubmit((data) => onSubmit(data));
  const navigateToSignup = () => {
    navigate('/signup');
  };

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  return {
    emailError,
    passwordError,
    register,
    submitHandler,
    navigateToSignup,
  };
};
