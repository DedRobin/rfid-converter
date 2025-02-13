import { useMemo, useState } from 'react';
import { ConverterType } from '../../../types/App';
import { isConverterType } from './services';
import { ConverterInputProps } from '../../../types/Converter';
import './style.css';

export default function ConverterInput({
  labelName,
  convertTo,
}: ConverterInputProps) {
  const className = useMemo(() => 'converter-input', []);

  const [value, setValue] = useState('');
  const [type, setType] = useState<ConverterType>('text');

  const onClick = () => {
    convertTo({ value, type });
  };

  return (
    <div className={className}>
      <select
        className={`${className}__select`}
        onChange={(event) => {
          const { value } = event.target;
          if (isConverterType(value)) setType(value);
        }}
      >
        <option className="select__option" value="text">
          Text
        </option>
        <option className="select__option" value="dex">
          DEX
        </option>
        <option className="select__option" value="hex">
          HEX
        </option>
      </select>
      <input
        id={labelName}
        className={`${className}__input`}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="field__button" onClick={onClick} type="button">
        Convert
      </button>
    </div>
  );
}
