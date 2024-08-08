import React from 'react';
import styles from './ButtonUnit.module.scss';
import { Link } from 'react-router-dom';

// ボタンのコンポーネント
interface ButtonProps {
  linkTo: string;
  linkText: string;
}

const ButtonUnit: React.FC<ButtonProps> = ({ linkTo, linkText }) => {
  return (
    <div className={styles.score_button}>
      <div className={styles.bg} />
      <Link to={linkTo}>
        <p>{linkText}</p>
      </Link>
    </div>
  );
};

export default ButtonUnit;
