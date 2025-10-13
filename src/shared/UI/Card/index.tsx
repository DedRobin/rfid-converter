import { FC, PropsWithChildren } from 'react';
import styles from './Card.module.css';

const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.hole} />
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default Card;
