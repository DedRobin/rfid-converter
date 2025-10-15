import './style.css';
import { languageSelector } from '@store/selectors/languageToggler';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { setLanguage } from '../../store/slices/languageTogglerSlice';


const LanguageToggler = () => {
  const dispatch = useDispatch();
  const { language } = useSelector(languageSelector);
  const { t } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;

    dispatch(setLanguage(selectedLanguage));
  };

  return (
    <select
      className="language-toggler"
      name="language-toggler"
      onChange={changeLanguage}
      value={language}
    >
      <option value="en">{t('languageToggler.en')}</option>
      <option value="ru">{t('languageToggler.ru')}</option>
    </select>
  );
};

export default LanguageToggler;
