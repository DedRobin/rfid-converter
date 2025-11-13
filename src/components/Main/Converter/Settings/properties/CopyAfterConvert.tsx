import { FC, FormEventHandler, useMemo } from 'react';

import { PositionalNumeralSystem } from '@customTypes/App';
import Radio from '@shared/UI/Radio';
import { settingsSelector } from '@store/selectors/settingsSelector';
import { setCopyAfterConvert } from '@store/slices/settingsSlice';
import { isPositionalNumeralSystem } from '@tools/converter';
import { useDispatch, useSelector } from 'react-redux';

import CollapseCheckbox from '../CollapseCheckbox';

import styles from './properties.module.css';

const CopyAfterConvert: FC = () => {
  const name = useMemo(() => 'numeric-type', []);
  const dispatch = useDispatch();
  const settingsState = useSelector(settingsSelector);

  const changeCopyAfterConvert = (numType: PositionalNumeralSystem | null) => {
    dispatch(setCopyAfterConvert(numType));
  };

  const onCheckboxChange: FormEventHandler = (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement) || !changeCopyAfterConvert) return;

    const defaultNumType = 'text';
    const initValue = input.checked ? defaultNumType : null;
    changeCopyAfterConvert(initValue);
  };

  const onTypeChange: FormEventHandler = (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement) || !changeCopyAfterConvert) return;

    const { value } = input;
    if (isPositionalNumeralSystem(value)) changeCopyAfterConvert(value);
  };

  const numType = settingsState.copyAfterConvert;
  return (
    <>
      <CollapseCheckbox onChange={onCheckboxChange} />
      <div
        className={styles.radioButtons}
        data-testid="copy-after-convert-test-id"
        onChange={onTypeChange}
      >
        <Radio
          checked={numType === 'text'}
          id="numTypeText"
          label="TEXT"
          name={name}
          value="text"
        />
        <Radio
          checked={numType === 'dex'}
          id="numTypeDex"
          label="DEX"
          name={name}
          value="dex"
        />
        <Radio
          checked={numType === 'hex'}
          id="numTypeHex"
          label="HEX"
          name={name}
          value="hex"
        />
      </div>
    </>
  );
};

export default CopyAfterConvert;
