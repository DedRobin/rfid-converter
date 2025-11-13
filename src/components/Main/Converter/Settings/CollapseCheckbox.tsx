import { FC, FormEventHandler, useMemo } from 'react';

import { settingsSelector } from '@store/selectors/settingsSelector';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface CollapseCheckboxProps {
  onChange: FormEventHandler;
}

const CollapseCheckbox: FC<CollapseCheckboxProps> = ({ onChange }) => {
  const name = useMemo(() => 'copy-after-convert', []);
  const settingsState = useSelector(settingsSelector);
  const { t } = useTranslation();

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
