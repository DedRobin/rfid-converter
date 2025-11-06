import { FC, FormEventHandler, useContext, useMemo } from 'react';

import { SettingsContext } from '@contexts/Settings';
import Radio from '@shared/UI/Radio';
import { settingsSelector } from '@store/selectors/settingsSelector';
import { isPositionalNumeralSystem } from '@tools/converter';
import { useSelector } from 'react-redux';

import styles from './properties.module.css';

const CopyAfterConvert: FC = () => {
  const name = useMemo(() => 'numeric-type', []);
  const { changeCopyAfterConvert } = useContext(SettingsContext);
  const settingsState = useSelector(settingsSelector);

  const onChange: FormEventHandler = (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement) || !changeCopyAfterConvert) return;

    const { value } = input;
    if (isPositionalNumeralSystem(value)) changeCopyAfterConvert(value);
  };

  const numType = settingsState.copyAfterConvert;
  return (
    <div className={styles.radioButtons} onChange={onChange}>
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
  );
};

export default CopyAfterConvert;
