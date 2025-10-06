import CardFormatContext from '@contexts/CardFormat';
import styles from './Values.module.css';
import { useContext } from 'react';

const DexValue = () => {
  const {
    handleCopy,
    values: { dex },
    currentCopiedType,
  } = useContext(CardFormatContext);

  return (
    handleCopy &&
    dex && (
      <div className={styles.dex}>
        <div className={styles.dexLabel}>Deximal</div>
        <div
          className={`${styles.dexValue} ${
            currentCopiedType === 'dex' ? styles.copied : ''
          }`}
          onClick={(e) => handleCopy(e, dex, 'dex')}
        >
          {dex}
        </div>
      </div>
    )
  );
};

export default DexValue;
