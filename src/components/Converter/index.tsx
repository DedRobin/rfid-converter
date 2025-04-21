import { useState } from 'react';
import ConverterInput from './Input';
import { ConvertTo } from '../../types/App';
import ConverterOutput from './Output';
import { updateField } from './services';
import { defaultFields } from './constants';
import './style.css';

export default function Converter() {
  const [fields, setFields] = useState(defaultFields);

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
      <ConverterInput labelName="Text" convertTo={convertTo} />
      <ConverterOutput text={fields.text} dex={fields.dex} hex={fields.hex} />
    </form>
  );
}
