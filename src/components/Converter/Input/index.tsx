import { ChangeEvent, useMemo, useState } from 'react';
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

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (isConverterType(value)) setType(value);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (type === 'text') {
      if (value.length === 3) {
        setValue((prev) => {
          if (prev[prev.length - 1] === ',') return value.slice(0, 2);
          else return value + ',';
        });
      } else setValue(value);
    }
    setValue(value);
  };

  return (
    <div className={className}>
      <select className={`${className}__select`} onChange={onSelectChange}>
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
        onChange={onInputChange}
      />
      <button className="field__button" onClick={onClick} type="button">
        Convert
      </button>
    </div>
  );
}
