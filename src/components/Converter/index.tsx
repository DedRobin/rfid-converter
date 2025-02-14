import { useState } from 'react';
import ConverterInput from './Input';
import { ConvertTo } from '../../types/App';
import ConverterOutput from './Output';
import { convert } from './services';
import './style.css';

export default function Converter() {
  const [fields, setFields] = useState({
    text: '',
    dex: '',
    hex: '',
  });
  const convertTo: ConvertTo = ({ value, type }) => {
    if (type === 'text') {
      console.log('convert from TEXT');

      const dex = convert.fromTextToDex(value);
      const hex = convert.fromTextToHex(value);
      setFields({ ...fields, text: value, dex, hex });
    } else if (type === 'dex') {
      const hex = convert.fromDexToHex(value);
      const text = convert.fromDexToText(value);

      setFields({ ...fields, text, dex: value, hex });
    } else if (type === 'hex') {
      const dex = convert.fromHexToDex(value);
      const text = convert.fromHexToText(value);
      setFields({ ...fields, text, dex, hex: value });
    }
  };
  return (
    <form className="converted-form">
      <ConverterInput labelName="Text" convertTo={convertTo} />
      <ConverterOutput text={fields.text} dex={fields.dex} hex={fields.hex} />
    </form>
  );
}
