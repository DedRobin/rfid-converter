import { FC } from 'react';

import styles from './Radio.module.css';

interface RadioProps {
  id: string;
  name: string;
  label: string;
  value: string;
  key?: string;
  checked?: boolean;
}

const Radio: FC<RadioProps> = ({ id, name, label, value, key, checked }) => {
  return (
    <label className={styles.label} key={key}>
      <input
        checked={checked}
        className={styles.radioInput}
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
