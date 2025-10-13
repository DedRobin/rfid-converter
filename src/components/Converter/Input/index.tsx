import './style.css';
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { handleInput, isConverterType } from './services';
import type { ConverterInputProps } from '@interfaces/Converter';
import { DEFAULT_TEMPLATES } from './constants';
import type { PositionalNumeralSystem } from '@customTypes/App';
import SelectType from './SelectType';
import ToastContext from '@contexts/Toast';
import styles from './Input.module.css';
import { useTranslation } from 'react-i18next';
import { valueIsValid } from '../services';

const ConverterInput: FC<ConverterInputProps> = ({ convertTo, saveAsCsv }) => {
  const className = useMemo(() => 'converter-input', []);
  const templates = useMemo(() => DEFAULT_TEMPLATES, []);

  const { notify } = useContext(ToastContext);
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState(templates.text);
  const [type, setType] = useState<PositionalNumeralSystem>('text');
  const [inputIsValid, setInputIsValid] = useState(false);
  const { t } = useTranslation();

  const handleCtrlV = useCallback(
    async (event: KeyboardEvent) => {
      const isCtrlV = event.ctrlKey && event.code === 'KeyV';

      if (isCtrlV) {
        try {
          const valueFromClipboard = await navigator.clipboard.readText();
          const isValid = validateInputValue(valueFromClipboard);

          setValue(() => {
            if (!isValid) return '';
            return valueFromClipboard;
          });
        } catch (error) {
          const errorMsg = t('input.errors.failToReadFromClipboard');

          notify(errorMsg, 'error');
          console.error(errorMsg, error);
        }
      }
    },
    [type, t, notify]
  );

  const handleEnterKeyword = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        convertTo({ value, type });
      }
    },
    [convertTo, type, value]
  );

  const clearInput = () => {
    setValue('');
    setInputIsValid(false);
  };

  const onConvertClick: MouseEventHandler<HTMLButtonElement> = () =>
    convertTo({ value, type });

  const onClearClick: MouseEventHandler<HTMLButtonElement> = () => clearInput();

  const onSelectTypeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const currentType = event.target.value;
    if (isConverterType(currentType)) {
      setType(currentType);
      setPlaceholder(templates[currentType]);
      clearInput();
    }
  };

  const validateInputValue = (value: string) => {
    let isValid = false;

    switch (type) {
      case 'text':
        isValid = valueIsValid.asText(value);
        break;
      case 'dex':
        isValid = valueIsValid.asDex(value);
        break;
      case 'hex':
        isValid = valueIsValid.asHex(value);
        break;
    }

    setInputIsValid(isValid);

    return isValid;
  };

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const current = event.target.value;

    setValue((previous) => {
      const updatedValue = handleInput({ previous, current }, type);

      validateInputValue(updatedValue);

      return updatedValue;
    });
  };
  const onSaveClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    saveAsCsv();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleCtrlV);
    window.addEventListener('keydown', handleEnterKeyword);

    return () => {
      window.removeEventListener('keydown', handleCtrlV);
      window.removeEventListener('keydown', handleEnterKeyword);
    };
  }, [handleEnterKeyword, handleCtrlV]);

  return (
    <div className={className}>
      <div className={`${className}__value`}>
        <SelectType
          className={className}
          onSelectTypeChange={onSelectTypeChange}
        />
        <input
          autoFocus={true}
          // className={`${className}__input`}
          className={`${styles.inputValue} ${
            !inputIsValid ? styles.notValid : ''
          }`}
          id="Text"
          onChange={onInputChange}
          placeholder={placeholder}
          value={value}
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
          disabled={!inputIsValid}
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
};

export default ConverterInput;
