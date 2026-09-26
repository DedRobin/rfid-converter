import { FC, useCallback, useContext, useState } from 'react';

import ToastContext from '@contexts/Toast';
import { ConverterHandler } from '@customTypes/App';
import type { RootState } from '@store/index';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { defaultFields } from './constants';
import styles from './Converter.module.css';
import ConverterInput from './Input';
import ConverterOutput from './Output';
import { copyToClipboard } from './Output/services';
import { updateField } from './services';
import Settings from './Settings';

const Converter: FC = () => {
  const [fields, setFields] = useState(defaultFields);
  const copyAfterConvert = useSelector((state: RootState) => state.settings.copyAfterConvert);
  const { notify } = useContext(ToastContext);
  const { t } = useTranslation();

  const saveAsCsv = useCallback(() => {
    const csvContent = `text,dex,hex\n"${fields.text}","${fields.dex}","${fields.hex}"`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converter.csv';
    a.click();
  }, [fields]);

  const convertTo: ConverterHandler = useCallback(({ value, type }) => {
    const data = { fields, value };
    const updatedFields = updateField(type, data);

    setFields(updatedFields);

    if (copyAfterConvert) {
      const numericType = copyAfterConvert;
      const value = updatedFields[numericType];

      copyToClipboard(value)
        .then(() => {
          notify(t('notifications.copiedToClipboard') + ` "${value}"`);
        })
        .catch((err: Error) => {
          notify(err.message, 'error');
        });
    }
  }, [fields, copyAfterConvert, notify, t]);

  return (
    <>
      <Settings />
      <div className={styles.container}>
        <ConverterInput convertTo={convertTo} saveAsCsv={saveAsCsv} />
        <ConverterOutput dex={fields.dex} hex={fields.hex} text={fields.text} />
      </div>
    </>
  );
};

export default Converter;
