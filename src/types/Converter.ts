import { ConvertTo } from './App';

interface ConverterInputProps {
  labelName: string;
  convertTo: ConvertTo;
}

interface ConverterOutputProps {
  text: string;
  dex: string;
  hex: string;
}

export type { ConverterInputProps, ConverterOutputProps };
