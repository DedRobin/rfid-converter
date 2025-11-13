import { FC, MouseEventHandler, useRef, useState } from 'react';

import useClickOutside from '@hooks/useClickOutside';
import { settingsSelector } from '@store/selectors/settingsSelector';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CopyAfterConvert from './properties/CopyAfterConvert';
import styles from './Settings.module.css';

const Settings: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const settingsState = useSelector(settingsSelector);
  const { t } = useTranslation();
  const ref = useRef(null);

  const changeCollapsedStatus: MouseEventHandler = () => {
    setIsCollapsed((prev) => !prev);
  };

  useClickOutside(ref, () => setIsCollapsed(false));

  return (
    <div className={styles.settings} data-testid="settings-test-id" ref={ref}>
      <div
        className={styles.collapseButton}
        data-testid="collapsed-button-test-id"
        onClick={changeCollapsedStatus}
      >
        {t('settings.label')}
      </div>
      {isCollapsed ? (
        <div className={styles.collapse} data-testid="collapsed-menu-test-id">
          {settingsState.copyAfterConvert ? <CopyAfterConvert /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default Settings;
