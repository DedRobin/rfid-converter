import { FC, MouseEventHandler, useRef, useState } from 'react';

import useClickOutside from '@hooks/useClickOutside';

import DropdownSvg from './dropdown.svg?react';
import styles from './Select.module.css';

interface Option {
  label: string;
  value: string;
}

interface SelectOptions {
  options: Option[];
  defaultOption: Option | undefined;
  onChange: (value: string | undefined) => void;
}

const Select: FC<SelectOptions> = ({ options, defaultOption, onChange }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive((prev) => !prev);

  const selectOption: MouseEventHandler<HTMLUListElement> = (event) => {
    const element = event.target;
    if (!(element instanceof HTMLLIElement)) return;

    const dataValue = element.dataset.value;

    if (!dataValue) return;

    onChange(dataValue);
  };

  const ref = useRef(null);

  useClickOutside(ref, () => setIsActive(false));

  return (
    <div className={styles.select} ref={ref}>
      <div
        className={styles.defaultOption}
        data-testid="custom-select"
        onClick={toggleActive}
      >
        <div data-testid="selected-option">
          {defaultOption?.label || options[0].label}
        </div>
        <DropdownSvg className={isActive ? styles.rotatedSvg : styles.svg} />
      </div>
      {isActive ? (
        <ul className={styles.options} onClick={selectOption}>
          {options.map((option) => (
            <li
              className={`${styles.option} ${
                defaultOption?.label === option.label ? styles.selected : ''
              }  `}
              data-testid="custom-select-option"
              data-value={option.value}
              key={`${option.value}_key`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Select;
