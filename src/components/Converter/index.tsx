import { useState } from 'react';

import { ConverterHandler } from '@customTypes/App';

import { defaultFields } from './constants';
import styles from './Converter.module.css';
import ConverterInput from './Input';
import ConverterOutput from './Output';
import { updateField } from './services';

const Converter = () => {
  const [fields, setFields] = useState(defaultFields);

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
  };

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <ConverterInput convertTo={convertTo} saveAsCsv={saveAsCsv} />
      <ConverterOutput dex={fields.dex} hex={fields.hex} text={fields.text} />
    </form>
  );
};

export default Converter;
