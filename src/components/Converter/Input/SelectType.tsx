import { FC } from 'react';
import type { SelectTypeProps } from '@interfaces/Converter';

const SelectType: FC<SelectTypeProps> = ({ className, onSelectTypeChange }) => {
  return (
    <select className={`${className}__select`} onChange={onSelectTypeChange}>
      <option className="select__option" value="text">
        Text
      </option>
      <option className="select__option" value="dex">
        DEX
      </option>
      <option className="select__option" value="hex">
        HEX
      </option>
    </select>
  );
};

export default SelectType;
