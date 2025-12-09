import { FC, useContext, useState } from 'react';

import ToastContext from '@contexts/Toast';
import { ConverterHandler } from '@customTypes/App';
import { settingsSelector } from '@store/selectors/settingsSelector';
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
  const settingsState = useSelector(settingsSelector);
  const { notify } = useContext(ToastContext);
  const { t } = useTranslation();

  const saveAsCsv = () => {
    const csvContent = `text,dex,hex\n"${fields.text}","${fields.dex}","${fields.hex}"`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converter.csv';
    a.click();
  };

  const convertTo: ConverterHandler = ({ value, type }) => {
    const data = { fields, value };
    const updatedFields = updateField(type, data);

    setFields(updatedFields);

    if (settingsState.copyAfterConvert) {
      const numericType = settingsState.copyAfterConvert;
      const value = updatedFields[numericType];

      copyToClipboard(value)
        .then(() => {
          notify(t('notifications.copiedToClipboard') + ` "${value}"`);
        })
        .catch((err: Error) => {
          notify(err.message, 'error');
        });
    }
  };

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
