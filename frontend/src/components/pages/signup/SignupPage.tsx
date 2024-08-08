import React from 'react';

import styles from './SignupPage.module.scss';
import { FormProvider } from 'react-hook-form';
import { useSignupPage } from './useSignupPage.hooks';
import { useSignupPageInternal } from './SignupPageInternal.hooks';

const SignupPageInternal: React.FC = () => {
  const {
    emailError,
    passwordError,
    register,
    submitHandler,
    navigateToLogin,
  } = useSignupPageInternal();

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <div>
          <label htmlFor='email'>Email:</label>
          <input id='email' type='string' {...register('email')} />
          {emailError && <p className={styles.error}>{emailError}</p>}
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' {...register('password')} />
          {passwordError && <p className={styles.error}>{passwordError}</p>}
        </div>
        <button onClick={submitHandler}>Sign up</button>
        <button onClick={navigateToLogin}>Log In</button>
      </form>
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
