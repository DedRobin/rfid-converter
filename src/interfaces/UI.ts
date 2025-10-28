import { ChangeEvent } from 'react';

interface RadioField {
  label: string;
  id: string;
  value: string;
}

interface RadioButtonGroupProps {
  initField: RadioField;
  name: string;
  legend: string;
  fields: RadioField[];
  onChange: (event: ChangeEvent<HTMLFieldSetElement>) => void;
}

interface RadioProps {
  id: string;
  name: string;
  label: string;
  value: string;
  checked?: boolean;
}

interface Option {
  label: string;
  value: string;
}

interface SelectOptions {
  options: Option[];
  defaultOption: Option | undefined;
  onChange: (value: string | undefined) => void;
}

export type { RadioButtonGroupProps, SelectOptions, RadioProps };
