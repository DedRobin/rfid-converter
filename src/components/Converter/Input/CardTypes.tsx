import { FC, FormEventHandler, useMemo, useState } from 'react';

import { PositionalNumeralSystem } from '@customTypes/App';
import { RadioButtonGroupProps } from '@interfaces/UI';
import RadioButtonGroup from '@shared/UI/RadioButtonGroup';

import { isPositionalNumeralSystemType } from './services';

interface CardTypesProps {
  changeType: (currentType: PositionalNumeralSystem) => void;
}

const CardTypes: FC<CardTypesProps> = ({ changeType }) => {
  const fields: RadioButtonGroupProps['fields'] = useMemo(
    () => [
      { label: 'Text', id: 'radioTextId', value: 'text' },
      { label: 'Dex', id: 'radioDexId', value: 'dex' },
      { label: 'Hex', id: 'radioHexId', value: 'hex' },
    ],
    []
  );

  const [initField, setInitField] = useState(fields[0]);

  const onChange: FormEventHandler<HTMLFieldSetElement> = (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    const { value } = e.target;

    if (isPositionalNumeralSystemType(value)) {
      changeType(value);
      setInitField(fields.find((field) => field.value === value) || fields[0]);
    }
  };

  return (
    <RadioButtonGroup
      fields={fields}
      initField={initField}
      legend="Select type"
      name="card-types"
      onChange={onChange}
    />
  );
};

export default CardTypes;
