import { SelectTypeProps } from '../../../interfaces/Converter';

export default function SelectType({
  className,
  onSelectTypeChange,
}: SelectTypeProps) {
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
}
