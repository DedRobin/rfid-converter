import Select from '@shared/UI/Select';
import { languageSelector } from '@store/selectors/languageToggler';
import { setLanguage } from '@store/slices/languageTogglerSlice';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styles from './LanguageToggler.module.css';

const LanguageToggler = () => {
  const dispatch = useDispatch();
  const { language } = useSelector(languageSelector);
  const { t } = useTranslation();

  const options = [
    { label: t('languageToggler.en'), value: 'en' },
    { label: t('languageToggler.ru'), value: 'ru' },
  ];

  const defaultOption = options.find((opt) => opt.value === language);

  const changeLanguage = (value: string | undefined) => {
    if (!value) return;

    dispatch(setLanguage(value));
  };

  return (
    <div className={styles.languageToggler}>
      <Select
        defaultOption={defaultOption}
        onChange={changeLanguage}
        options={options}
      />
    </div>
  );
};

export default LanguageToggler;
