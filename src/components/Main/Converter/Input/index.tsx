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

import ToastContext from '@contexts/Toast';
import type { PositionalNumeralSystem } from '@customTypes/App';
import type { ConverterInputProps } from '@interfaces/Converter';
import { useTranslation } from 'react-i18next';

import { valueIsValid } from '../services';

import CardTypes from './CardTypes';
import { DEFAULT_TEMPLATES } from './constants';
import styles from './Input.module.css';
import Prompt from './Prompt';
import { handleInput } from './services';

const ConverterInput: FC<ConverterInputProps> = ({ convertTo, saveAsCsv }) => {
  const templates = useMemo(() => DEFAULT_TEMPLATES, []);

  const { notify } = useContext(ToastContext);
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState(templates.text);
  const [type, setType] = useState<PositionalNumeralSystem>('text');
  const [inputIsValid, setInputIsValid] = useState(false);
  const { t } = useTranslation();

  const validateInputValue = useCallback(
    (value: string) => {
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
    },
    [type]
  );

  const handleCtrlV = useCallback(
    (event: KeyboardEvent) => {
      const getDataFromClipboard = async () => {
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
      };

      void getDataFromClipboard();
    },
    [validateInputValue, t, notify]
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

  const onConvertClick: MouseEventHandler<HTMLButtonElement> = () => {
    convertTo({ value, type });
  };

  const onClearClick: MouseEventHandler<HTMLButtonElement> = () => clearInput();

  const changeType = (currentType: PositionalNumeralSystem) => {
    setType(currentType);
    setPlaceholder(templates[currentType]);
    clearInput();
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
    <div className={styles.converter}>
      <CardTypes changeType={changeType} />
      <input
        autoFocus={true}
        id="Text"
        onChange={onInputChange}
        placeholder={placeholder}
        type="text"
        value={value}
      />
      <Prompt msg={inputIsValid ? '' : t('input.prompt')} />
      <div className={styles.converterButtons}>
        <button onClick={onClearClick} type="button">
          X
        </button>
        <button disabled={!inputIsValid} onClick={onConvertClick} type="button">
          {t('Convert')}
        </button>
        <button onClick={onSaveClick} type="button">
          💾
        </button>
      </div>
    </div>
  );
};

export default ConverterInput;
