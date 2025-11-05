import {
  FC,
  FormEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';

import useClickOutside from '@hooks/useClickOutside';
import Radio from '@shared/UI/Radio';
import { settingsSelector } from '@store/selectors/settingsSelector';
import { setCopyAfterConvert } from '@store/slices/settingsSlice';
import { isPositionalNumeralSystem } from '@tools/converter';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Settings.module.css';

const Settings: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const settingsState = useSelector(settingsSelector);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ref = useRef(null);

  const changeCollapsedStatus: MouseEventHandler = () => {
    setIsCollapsed((prev) => !prev);
  };
  const changeSettigns: FormEventHandler = (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement)) return;

    switch (input.name) {
      case 'copyAfterConvert': {
        dispatch(setCopyAfterConvert(input.checked ? 'text' : null));
        break;
      }
      case 'numType': {
        if (isPositionalNumeralSystem(input.value)) {
          dispatch(setCopyAfterConvert(input.value));
        }

        break;
      }
    }
  };

  useClickOutside(ref, () => setIsCollapsed(false));

  return (
    <div className={styles.settings} ref={ref}>
      <div className={styles.collapseButton} onClick={changeCollapsedStatus}>
        Settings
      </div>
      {isCollapsed ? (
        <div className={styles.collapse} onChange={changeSettigns}>
          <div>
            <input
              checked={!!settingsState.copyAfterConvert}
              id="copyAfterConvertId"
              name="copyAfterConvert"
              type="checkbox"
            />
            <label htmlFor="copyAfterConvertId">
              {t('settigns.copyAfterConvert')}
            </label>
          </div>
          {settingsState.copyAfterConvert ? (
            <div className={styles.radioButtons}>
              <Radio
                checked={settingsState.copyAfterConvert === 'text'}
                id="numTypeText"
                label="TEXT"
                name="numType"
                value="text"
              />
              <Radio
                checked={settingsState.copyAfterConvert === 'dex'}
                id="numTypeDex"
                label="DEX"
                name="numType"
                value="dex"
              />
              <Radio
                checked={settingsState.copyAfterConvert === 'hex'}
                id="numTypeHex"
                label="HEX"
                name="numType"
                value="hex"
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Settings;
