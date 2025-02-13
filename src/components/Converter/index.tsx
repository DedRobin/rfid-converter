import { useState } from 'react';
import ConverterInput from './Input';
import { ConvertTo } from '../../types/App';
import ConverterOutput from './Output';
import './style.css';

export default function Converter() {
  const [fields, setFields] = useState({
    text: '',
    dex: '',
    hex: '',
  });
  const convertTo: ConvertTo = ({ value, type }) => {
    const newValue = [value, type].join(' ');
    setFields({ ...fields, [type]: newValue });
  };
  return (
    <form className="converted-form">
      <ConverterInput labelName="Text" convertTo={convertTo} />
      <ConverterOutput text={fields.text} dex={fields.dex} hex={fields.hex} />
    </form>
  );
}
