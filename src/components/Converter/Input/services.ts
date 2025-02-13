import { ConverterType } from '../../../types/App';

const isConverterType = (value: string): value is ConverterType => {
  return ['text', 'dex', 'hex'].includes(value);
};

export { isConverterType };
