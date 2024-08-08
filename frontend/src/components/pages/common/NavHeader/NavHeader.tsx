import { FlexBox } from '@/components/common';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NavHeader.module.scss';
import logo from '@/assets/whiteIcon.svg';

const NavHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <FlexBox
      alignItems='center'
      justifyContent='center'
      className={styles.headerContainer}
    >
      <FlexBox
        justifyContent='space-between'
        alignItems='center'
        className={styles.headerContainerInner}
      >
        <img
          src={logo}
          alt='logo'
          width={155}
          className={styles.headerIcon}
          onClick={() => navigate('/')}
        />
        {location.pathname === '/' && (
          <button
            onClick={() => navigate('/login')}
            className={styles.loginButton}
          >
            ログイン
          </button>
        )}
      </FlexBox>
    </FlexBox>
  );
};
export default NavHeader;
