import { MouseEventHandler, useContext } from 'react';

import CardFormatContext from '@contexts/CardFormat';

import styles from './Values.module.css';

const TextValue = () => {
  const {
    handleCopy,
    values: { text },
    currentCopiedType,
  } = useContext(CardFormatContext);

  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!handleCopy || !text) return;

    void handleCopy(e, text, 'text');
  };

  return (
    handleCopy &&
    text && (
      <div className={styles.text}>
        <div className={styles.textLabel}>Text</div>
        <div
          className={`${styles.textValue} ${
            currentCopiedType === 'text' ? styles.copied : ''
          }`}
          onClick={onClick}
        >
          {text}
        </div>
      </div>
    )
  );
};

export default TextValue;
