import { Dispatch, SetStateAction } from 'react';
import { ConverterType } from '../../../types/App';
import { isNumber } from '../../../tools/number';

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
    if (!isNumber(lastChar)) return prevValue;
    if (length >= 10) return prevValue;
    if (length === 4) {
      return lastChar !== ','
        ? [prevValue, lastChar].join(',')
        : currentValue.slice(0, 3);
    }

    return currentValue;
  });
};

export { isConverterType, handleTextInput };
