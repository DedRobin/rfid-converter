import { ChangeEvent } from 'react';
import { ConvertTo } from '../types/App';

interface ConverterInputProps {
  labelName: string;
  convertTo: ConvertTo;
}

interface ConverterOutputProps {
  text: string;
  dex: string;
  hex: string;
}

interface SelectTypeProps {
  className: string;
  onSelectTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export type { ConverterInputProps, ConverterOutputProps, SelectTypeProps };
