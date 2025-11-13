import { FC } from 'react';

import LanguageToggler from '@components/Header/LanguageToggler';

import styles from './Header.module.css';
const Header: FC = () => (
  <header className={styles.header}>
    <LanguageToggler />
  </header>
);

export default Header;
