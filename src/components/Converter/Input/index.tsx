import './style.css';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { handleClipboardInput, handleInput, isConverterType } from './services';
import type { ConverterInputProps } from '@interfaces/Converter';
import type { ConverterType } from '@customTypes/App';
import { DEFAULT_TEMPLATES } from './constants';
import SelectType from './SelectType';
import { useTranslation } from 'react-i18next';

export default function ConverterInput({
  labelName,
  convertTo,
  saveAsCsv,
}: ConverterInputProps) {
  const className = useMemo(() => 'converter-input', []);
  const templates = useMemo(() => DEFAULT_TEMPLATES, []);

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
      <div className={`${className}__value`}>
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
      </div>
      <div className={`${className}__buttons`}>
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
    </div>
  );
}
