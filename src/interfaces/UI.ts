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

export type { RadioButtonGroupProps };
