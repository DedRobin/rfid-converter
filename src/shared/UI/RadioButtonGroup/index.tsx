import { FC } from 'react';

import { RadioButtonGroupProps } from '@interfaces/UI';

import styles from './RadioButtonGroup.module.css';

const RadioButtonGroup: FC<RadioButtonGroupProps> = ({
  name,
  legend,
  fields,
  onChange,
}) => {
  return (
    <fieldset className={styles.radioButtons} name={name} onChange={onChange}>
      <legend>{legend}</legend>
      {fields.map((value) => (
        <div key={value.id}>
          <input id={value.id} name={name} type="radio" value={value.value} />
          <label htmlFor={value.id}>{value.label}</label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioButtonGroup;
