import { FC } from 'react';

import Converter from './Converter';
import styles from './Main.module.css';

const Main: FC = () => (
  <main className={styles.main}>
    <Converter />
  </main>
);

export default Main;
