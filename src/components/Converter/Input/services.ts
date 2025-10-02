import { Dispatch, SetStateAction } from 'react';
import { MAX_DEX_LENGTH, MAX_DEX_VALUE, MAX_TEXT_VALUE } from './constants';
import { isABCDEF, isNumber } from '@tools/character';
import { ConverterType } from '@customTypes/App';

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
    let updatedValue = currentValue;
    const { length } = currentValue;
    const lastChar = currentValue.slice(-1);

    if (!isNumber(lastChar) && lastChar !== ',') return prevValue;
    if (length >= 10) return prevValue;
    if (length === 4) {
      updatedValue =
        lastChar !== ','
          ? [prevValue, lastChar].join(',')
          : currentValue.slice(0, 3);
    }

    let [left, right] = updatedValue.split(',').map((v) => Number(v));
    if (left && !Number.isNaN(left) && left > MAX_TEXT_VALUE.LEFT) {
      updatedValue = String(MAX_TEXT_VALUE.LEFT);
      if (right) updatedValue += ',' + right;
      left = MAX_TEXT_VALUE.LEFT;
    }
    if (right && right > MAX_TEXT_VALUE.RIGHT) {
      updatedValue = left + ',' + MAX_TEXT_VALUE.RIGHT;
      right = MAX_TEXT_VALUE.RIGHT;
    }

    return updatedValue;
  });
};

const handleAsDex: InputHandler = (currentValue, setValue) => {
  setValue((prevValue) => {
    const { length } = currentValue;
    const lastChar = currentValue.slice(-1);

    if (!isNumber(lastChar)) return prevValue;
    if (length >= MAX_DEX_LENGTH) return prevValue;
    if (Number(currentValue) >= MAX_DEX_VALUE.NUMBER)
      return MAX_DEX_VALUE.STRING;

    return currentValue;
  });
};

const handleAsHex: InputHandler = (currentValue, setValue) => {
  setValue((prevValue) => {
    const { length } = currentValue;
    const lastChar = currentValue.slice(-1);

    if (!isNumber(lastChar) && !isABCDEF(lastChar)) return prevValue;
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
