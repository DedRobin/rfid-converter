import { FC } from 'react';

import ExclamationMark from './exclamationMark.svg?react';
import styles from './Input.module.css';

interface PromptProps {
  msg?: string;
}

const Prompt: FC<PromptProps> = ({ msg }) => {
  return (
    <div className={styles.promptWrapper}>
      {msg ? (
        <span className={styles.prompt}>
          <ExclamationMark className={styles.exclamationMark} />
          {msg}
        </span>
      ) : null}
    </div>
  );
};

export default Prompt;
