import { useContext } from 'react';

import CardFormatContext from '@contexts/CardFormat';

import styles from './Values.module.css';

const TextValue = () => {
  const {
    handleCopy,
    values: { text },
    currentCopiedType,
  } = useContext(CardFormatContext);

  return (
    handleCopy &&
    text && (
      <div className={styles.text}>
        <div className={styles.textLabel}>Text</div>
        <div
          className={`${styles.textValue} ${
            currentCopiedType === 'text' ? styles.copied : ''
          }`}
          onClick={(e) => handleCopy(e, text, 'text')}
        >
          {text}
        </div>
      </div>
    )
  );
};

export default TextValue;
