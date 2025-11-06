import { FC, FormEventHandler, useContext, useMemo } from 'react';

import { SettingsContext } from '@contexts/Settings';
import { settingsSelector } from '@store/selectors/settingsSelector';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const CollapseCheckbox: FC = () => {
  const name = useMemo(() => 'copy-after-convert', []);
  const { changeCopyAfterConvert } = useContext(SettingsContext);
  const settingsState = useSelector(settingsSelector);
  const { t } = useTranslation();

  const onChange: FormEventHandler = (e) => {
    const input = e.target;
    if (!(input instanceof HTMLInputElement) || !changeCopyAfterConvert) return;

    const defaultNumType = 'text';
    changeCopyAfterConvert(input.checked ? defaultNumType : null);
  };

  return (
    <div onChange={onChange}>
      <input
        defaultChecked={!!settingsState.copyAfterConvert}
        id="copyAfterConvertId"
        name={name}
        type="checkbox"
      />
      <label htmlFor="copyAfterConvertId">
        {t('settings.copyAfterConvert')}
      </label>
    </div>
  );
};

export default CollapseCheckbox;
