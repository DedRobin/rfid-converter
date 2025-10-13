import { MAX_DEX_LENGTH, MAX_DEX_VALUE, MAX_TEXT_VALUE } from './constants';
import { isABCDEF, isNumber } from '@tools/character';
import { PositionalNumeralSystem } from '@customTypes/App';

type InputHandler = ({
  previous,
  current,
}: {
  previous: string;
  current: string;
}) => string;

const isConverterType = (value: string): value is PositionalNumeralSystem => {
  return ['text', 'dex', 'hex'].includes(value);
};

const handleInput = (
  values: { previous: string; current: string },
  type: PositionalNumeralSystem
) => {
  switch (type) {
    case 'text':
      return returnAsText(values);
    case 'dex':
      return returnAsDex(values);
    case 'hex':
      return returnAsHex(values);
    default:
      return values.current;
  }
};

const returnAsText: InputHandler = ({ current, previous }) => {
  let updatedValue = current;
  const { length } = current;
  const lastChar = current.slice(-1);

  if (!isNumber(lastChar) && lastChar !== ',') return previous;
  if (length >= 10) return previous;
  if (length === 4) {
    updatedValue =
      lastChar !== ',' ? [previous, lastChar].join(',') : current.slice(0, 3);
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
};

const returnAsDex: InputHandler = ({ previous, current }) => {
  const { length } = current;
  const lastChar = current.slice(-1);

  if (!isNumber(lastChar)) return previous;
  if (length >= MAX_DEX_LENGTH) return previous;
  if (Number(current) >= MAX_DEX_VALUE.NUMBER) return MAX_DEX_VALUE.STRING;

  return current;
};

const returnAsHex: InputHandler = ({ previous, current }) => {
  const { length } = current;
  const lastChar = current.slice(-1);

  if (!isNumber(lastChar) && !isABCDEF(lastChar)) return previous;
  if (length >= 7) return previous;

  return current.toUpperCase();
};

export { isConverterType, handleInput };
