import { FC } from 'react';

import styles from './Loader.module.css';

const Loader: FC = () => (
  <div className={styles.loader}>
    <div className={styles.doubleBounceOne} />
    <div className={styles.doubleBounceTwo} />
  </div>
);

export default Loader;
