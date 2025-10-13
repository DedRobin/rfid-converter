import { ChangeEvent } from 'react';
import { ConverterHandler } from '@customTypes/App';

interface ConverterInputProps {
  convertTo: ConverterHandler;
  saveAsCsv: () => void;
}

interface Fields {
  text: string;
  dex: string;
  hex: string;
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

export type {
  ConverterInputProps,
  ConverterOutputProps,
  SelectTypeProps,
  Fields,
};
