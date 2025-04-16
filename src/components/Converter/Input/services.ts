import { Dispatch, SetStateAction } from 'react';
import { ConverterType } from '../../../types/App';
import { isABCDIF, isNumber } from '../../../tools/character';

type InputHandler = (
  value: string,
  setValue: Dispatch<SetStateAction<typeof value>>
) => void;

const isConverterType = (value: string): value is ConverterType => {
  return ['text', 'dex', 'hex'].includes(value);
};

const handleInput = (
  value: string,
  type: ConverterType,
  setValue: Dispatch<SetStateAction<string>>
) => {
  switch (type) {
    case 'text':
      handleAsText(value, setValue);
      break;
    case 'dex':
      handleAsDex(value, setValue);
      break;
    case 'hex':
      handleAsHex(value, setValue);
      break;
    default:
      setValue(value);
  }
};

const handleAsText: InputHandler = (currentValue, setValue) => {
  setValue((prevValue) => {
    const { length } = currentValue;
    const lastChar = currentValue.slice(-1);

    if (!isNumber(lastChar) && lastChar !== ',') return prevValue;
    if (length >= 10) return prevValue;
    if (length === 4) {
      return lastChar !== ','
        ? [prevValue, lastChar].join(',')
        : currentValue.slice(0, 3);
    }

    return currentValue;
  });
};

const handleAsDex: InputHandler = (currentValue, setValue) => {
  setValue((prevValue) => {
    const { length } = currentValue;
    const lastChar = currentValue.slice(-1);

    if (!isNumber(lastChar)) return prevValue;
    if (length >= 11) return prevValue;

    return currentValue;
  });
};

const handleAsHex: InputHandler = (currentValue, setValue) => {
  setValue((prevValue) => {
    const { length } = currentValue;
    const lastChar = currentValue.slice(-1);

    if (!isNumber(lastChar) && !isABCDIF(lastChar)) return prevValue;
    if (length >= 7) return prevValue;

    return currentValue.toUpperCase();
  });
};

const handleClipboardInput = (
  type: ConverterType,
  setValue: Dispatch<SetStateAction<string>>
) => {
  navigator.clipboard
    .readText()
    .then((text) => {
      handleInput(text, type, setValue);
    })
    .catch((err) => {
      console.error('Failed to read clipboard contents: ', err);
    });
};

export { isConverterType, handleClipboardInput, handleInput };
