import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { ConverterType } from '../../../types/App';
import {
  handleClipboardInput,
  handleDexInput,
  handleHexInput,
  handleTextInput,
  isConverterType,
} from './services';
import { ConverterInputProps } from '../../../types/Converter';
import './style.css';

export default function ConverterInput({
  labelName,
  convertTo,
}: ConverterInputProps) {
  const className = useMemo(() => 'converter-input', []);
  const templates = useMemo(
    () => ({
      text: '000,00000',
      dex: '0000000000',
      hex: '000000',
    }),
    []
  );

  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState(templates.text);
  const [type, setType] = useState<ConverterType>('text');

  const insertDataFromClipboard = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'v') handleClipboardInput(setValue);
  };

  const onConvertClick = () => {
    convertTo({ value, type });
  };

  const onClearClick = () => {
    setValue('');
  };

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentType = event.target.value;
    if (isConverterType(currentType)) {
      setType(currentType);
      setPlaceholder(templates[currentType]);
      setValue('');
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    switch (type) {
      case 'text':
        handleTextInput(value, setValue);
        break;
      case 'dex':
        handleDexInput(value, setValue);
        break;
      case 'hex':
        handleHexInput(value, setValue);
        break;
      default:
        setValue(value);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', insertDataFromClipboard);

    return () => {
      window.removeEventListener('keydown', insertDataFromClipboard);
    };
  }, []);

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
        placeholder={placeholder}
        onChange={onInputChange}
      />
      <button
        className="field__button--clear"
        onClick={onClearClick}
        type="button"
      >
        X
      </button>
      <button
        className="field__button--convert"
        onClick={onConvertClick}
        type="button"
      >
        Convert
      </button>
    </div>
  );
}
