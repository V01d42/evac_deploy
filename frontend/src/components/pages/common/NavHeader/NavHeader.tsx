import { FlexBox } from '@/components/common';

import styles from './NavHeader.module.scss';

import logo from '@/assets/whiteIcon.svg';

const NavHeader = () => {
  return (
    <FlexBox
      alignItems='center'
      justifyContent='center'
      className={styles.headerContainer}
    >
      <FlexBox className={styles.headerContainerInner}>
        <img src={logo} alt='logo' width={155} />
      </FlexBox>
    </FlexBox>
  );
};
export default NavHeader;
