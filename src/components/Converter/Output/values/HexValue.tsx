import { useContext } from 'react';

import CardFormatContext from '@contexts/CardFormat';

import styles from './Values.module.css';

const HexValue = () => {
  const {
    handleCopy,
    values: { hex },
    currentCopiedType,
  } = useContext(CardFormatContext);

  return (
    handleCopy &&
    hex && (
      <div className={styles.hex}>
        <div className={styles.hexLabel}>Heximal</div>
        <div
          className={`${styles.hexValue} ${
            currentCopiedType === 'hex' ? styles.copied : ''
          }`}
          onClick={(e) => handleCopy(e, hex, 'hex')}
        >
          {hex}
        </div>
      </div>
    )
  );
};

export default HexValue;
