import React from 'react';
import { TextField, Typography } from '@mui/material';
import styles from './SignupPage.module.scss';
import { FormProvider } from 'react-hook-form';
import { useSignupPage } from './useSignupPage.hooks';
import { useSignupPageInternal } from './SignupPageInternal.hooks';
import logo from '@/assets/logo1.png';

const SignupPageInternal: React.FC = () => {
  const {
    emailError,
    passwordError,
    register,
    submitHandler,
    navigateToLogin,
  } = useSignupPageInternal();

  return (
    <div className={styles.loginContainer}>
      <img id='logo' src={logo} alt='Logo' className={styles.logo} />
      <div className={styles.formBackground}>
        <Typography variant='h6' className={styles.title}>
          新規登録
        </Typography>
        <form onSubmit={SignupPageInternal} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <TextField
              id='email'
              label='メールアドレス'
              variant='standard'
              type='email' // 使用标准的 type="email"
              {...register('email')}
              error={!!emailError}
              helperText={emailError}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <TextField
              id='password'
              label='パスワード'
              variant='standard'
              type='password'
              {...register('password')}
              error={!!passwordError}
              helperText={passwordError}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button
              type='submit'
              onClick={submitHandler}
              className={`${styles.button} ${styles.registerButton}`}
            >
              新規登録
            </button>
            <button
              type='submit'
              className={`${styles.button} ${styles.loginButton}`}
              onClick={navigateToLogin}
            >
              戻る
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignupPage = () => {
  const { methods } = useSignupPage();

  return (
    <FormProvider {...methods}>
      <SignupPageInternal />
    </FormProvider>
  );
};

export default SignupPage;
