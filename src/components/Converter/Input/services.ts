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

const handleTextInput: InputHandler = (currentValue, setValue) => {
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
const handleDexInput: InputHandler = (currentValue, setValue) => {
  setValue((prevValue) => {
    const { length } = currentValue;
    const lastChar = currentValue.slice(-1);

    if (!isNumber(lastChar)) return prevValue;
    if (length >= 11) return prevValue;

    return currentValue;
  });
};

const handleHexInput: InputHandler = (currentValue, setValue) => {
  setValue((prevValue) => {
    const { length } = currentValue;
    const lastChar = currentValue.slice(-1);

    if (!isNumber(lastChar) && !isABCDIF(lastChar)) return prevValue;
    if (length >= 7) return prevValue;

    return currentValue.toUpperCase();
  });
};

export { isConverterType, handleTextInput, handleDexInput, handleHexInput };
