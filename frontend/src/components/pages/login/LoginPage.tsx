import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useLoginPage } from './useLoginPage.hooks';
import { useLoginPageInternal } from './useLoginPageInternal.hooks';
import styles from './LoginPage.module.scss';
import logo from '@/assets/logo1.png';
import classNames from 'classnames';

const LogInPageInternal: React.FC = () => {
  const {
    emailError,
    passwordError,
    register,
    submitHandler,
    navigateToSignup,
  } = useLoginPageInternal();

  return (
    <div className={styles.loginContainer}>
      <img id='logo' src={logo} alt='Logo' className={styles.logo} />
      <div className={styles.formBackground}>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor='email' className={styles.label}>
              ユーザー名
            </label>
            <input
              id='email'
              type='string'
              {...register('email')}
              className={styles.input}
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='password' className={styles.label}>
              パスワード
            </label>
            <input
              id='password'
              type='password'
              {...register('password')}
              className={styles.input}
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
          </div>
          <div className={styles.buttonContainer}>
            <button
              type='button'
              className={classNames(styles.button, styles.loginButton)}
              onClick={submitHandler}
            >
              ログイン
            </button>
            <button
              type='button'
              className={classNames(styles.button, styles.registerButton)}
              onClick={navigateToSignup}
            >
              新規登録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const LogInPage = () => {
  const { methods } = useLoginPage();

  return (
    <FormProvider {...methods}>
      <LogInPageInternal />
    </FormProvider>
  );
};

export default LogInPage;
