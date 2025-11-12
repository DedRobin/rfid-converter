import { FC, MouseEventHandler, useRef, useState } from 'react';

import { SettingsContext } from '@contexts/Settings';
import { PositionalNumeralSystem } from '@customTypes/App';
import useClickOutside from '@hooks/useClickOutside';
import { settingsSelector } from '@store/selectors/settingsSelector';
import { setCopyAfterConvert } from '@store/slices/settingsSlice';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CollapseCheckbox from './CollapseCheckbox';
import CopyAfterConvert from './properties/CopyAfterConvert';
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
  const changeCopyAfterConvert = (numType: PositionalNumeralSystem | null) => {
    dispatch(setCopyAfterConvert(numType));
  };

  useClickOutside(ref, () => setIsCollapsed(false));

  return (
    <div className={styles.settings} data-testid="settings-test-id" ref={ref}>
      <div className={styles.collapseButton} onClick={changeCollapsedStatus}>
        {t('settings.label')}
      </div>
      {isCollapsed ? (
        <SettingsContext value={{ changeCopyAfterConvert }}>
          <div className={styles.collapse}>
            <CollapseCheckbox />
            {settingsState.copyAfterConvert ? <CopyAfterConvert /> : null}
          </div>
        </SettingsContext>
      ) : null}
    </div>
  );
};

export default Settings;
