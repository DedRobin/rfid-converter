import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ConverterType } from '../../../types/App';
import { handleClipboardInput, handleInput, isConverterType } from './services';
import { ConverterInputProps } from '../../../types/Converter';
import { defaultTemplates } from './constants';
import './style.css';

export default function ConverterInput({
  labelName,
  convertTo,
}: ConverterInputProps) {
  const className = useMemo(() => 'converter-input', []);
  const templates = useMemo(() => defaultTemplates, []);

  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState(templates.text);
  const [type, setType] = useState<ConverterType>('text');

  const insertDataFromClipboard = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === 'KeyV')
        handleClipboardInput(type, setValue);
      if (event.key === 'Enter') {
        convertTo({ value, type });
      }
    },
    [type, value, convertTo]
  );
  const onConvertClick = () => convertTo({ value, type });
  const onClearClick = () => setValue('');
  const onSelectTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentType = event.target.value;
    if (isConverterType(currentType)) {
      setType(currentType);
      setPlaceholder(templates[currentType]);
      setValue('');
    }
  };
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleInput(value, type, setValue);
  };

  useEffect(() => {
    window.addEventListener('keydown', insertDataFromClipboard);

    return () => {
      window.removeEventListener('keydown', insertDataFromClipboard);
    };
  }, [insertDataFromClipboard]);

  return (
    <div className={className}>
      <select className={`${className}__select`} onChange={onSelectTypeChange}>
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
        autoFocus={true}
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
