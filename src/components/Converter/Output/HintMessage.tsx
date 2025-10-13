import { FC } from 'react';
import { HintProps } from '@interfaces/Output';
import styles from './Output.module.css';
import { useTranslation } from 'react-i18next';

const Hint: FC<HintProps> = ({ currentCopiedType, hasConvertedData }) => {
  const { t } = useTranslation();

  const initMsg = t('output.initMsg')
    .split('.')
    .map((stringPart, index) => <p key={index}>{stringPart}</p>);

  if (currentCopiedType) {
    return (
      <div className={styles.hint}>
        <span>{t('output.isCopied')}</span>
      </div>
    );
  }

  return (
    <div className={styles.hint}>
      {hasConvertedData ? t('output.afterConvertMsg') : initMsg}
    </div>
  );
};

export default Hint;
