import { ChangeEvent } from 'react';

interface RadioButtonGroupProps {
  name: string;
  legend: string;
  fields: { label: string; id: string; value: string }[];
  onChange: (event: ChangeEvent<HTMLFieldSetElement>) => void;
}

export type { RadioButtonGroupProps };
