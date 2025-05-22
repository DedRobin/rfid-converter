import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ConverterType } from '@customTypes/App';
import { handleClipboardInput, handleInput, isConverterType } from './services';
import { defaultTemplates } from './constants';
import { useTranslation } from 'react-i18next';
import SelectType from './SelectType';
import type { ConverterInputProps } from '@interfaces/Converter';
import './style.css';

export default function ConverterInput({
  labelName,
  convertTo,
  saveAsCsv,
}: ConverterInputProps) {
  const className = useMemo(() => 'converter-input', []);
  const templates = useMemo(() => defaultTemplates, []);

  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState(templates.text);
  const [type, setType] = useState<ConverterType>('text');
  const { t } = useTranslation();

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

  const onConvertClick: MouseEventHandler<HTMLButtonElement> = () =>
    convertTo({ value, type });
  const onClearClick: MouseEventHandler<HTMLButtonElement> = () => setValue('');
  const onSelectTypeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const currentType = event.target.value;
    if (isConverterType(currentType)) {
      setType(currentType);
      setPlaceholder(templates[currentType]);
      setValue('');
    }
  };
  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    handleInput(value, type, setValue);
  };
  const onSaveClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    saveAsCsv();
  };

  useEffect(() => {
    window.addEventListener('keydown', insertDataFromClipboard);

    return () => {
      window.removeEventListener('keydown', insertDataFromClipboard);
    };
  }, [insertDataFromClipboard]);

  return (
    <div className={className}>
      <SelectType
        className={className}
        onSelectTypeChange={onSelectTypeChange}
      />
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
        {t('Convert')}
      </button>
      <button
        className="field__button--save"
        onClick={onSaveClick}
        type="button"
      >
        💾
      </button>
    </div>
  );
}
