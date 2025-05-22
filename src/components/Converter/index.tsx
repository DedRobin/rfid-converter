import { useState } from 'react';
import ConverterInput from './Input';
import { ConvertTo } from '../../types/App';
import ConverterOutput from './Output';
import { updateField } from './services';
import { defaultFields } from './constants';
import './style.css';

export default function Converter() {
  const [fields, setFields] = useState(defaultFields);

  const saveAsCsv = () => {
    const csvContent = `text,dex,hex\n"${fields.text}","${fields.dex}","${fields.hex}"`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converter.csv';
    a.click();
  };

  const convertTo: ConvertTo = ({ value, type }) => {
    const data = { fields, value };
    const updatedFields = updateField(type, data);

    setFields(updatedFields);
  };

  return (
    <form
      className="converted-form"
      onSubmit={(event) => event.preventDefault()}
    >
      <ConverterInput
        labelName="Text"
        convertTo={convertTo}
        saveAsCsv={saveAsCsv}
      />
      <ConverterOutput text={fields.text} dex={fields.dex} hex={fields.hex} />
    </form>
  );
}
