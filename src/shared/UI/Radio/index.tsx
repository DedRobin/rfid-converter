import { FC } from 'react';

import { RadioProps } from '@interfaces/UI';

import styles from './Radio.module.css';

const Radio: FC<RadioProps> = ({ id, name, label, value, checked }) => {
  return (
    <label className={styles.label}>
      <input
        className={styles.radioInput}
        defaultChecked={checked}
        id={id}
        name={name}
        type="radio"
        value={value}
      />
      <span className={styles.customRadioOuter}>
        <span className={styles.customRadioInner} />
      </span>
      {label}
    </label>
  );
};

export default Radio;
