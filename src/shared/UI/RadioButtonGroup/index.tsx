import { FC } from 'react';

import { RadioButtonGroupProps } from '@interfaces/UI';

import Radio from '../Radio';

import styles from './RadioButtonGroup.module.css';

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  initField,
  name,
  legend,
  fields,
  onChange,
}) => {
  return (
    <fieldset className={styles.radioButtons} name={name} onChange={onChange}>
      <legend className={styles.legend}>{legend}</legend>
      {fields.map((field) => (
        <Radio
          checked={field === initField}
          id={field.id}
          key={field.id}
          label={field.label}
          name={name}
          value={field.value}
        />
      ))}
    </fieldset>
  );
};

export default RadioButtonGroup;
