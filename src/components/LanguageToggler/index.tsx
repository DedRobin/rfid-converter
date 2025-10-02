import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setLanguage } from '../../store/slices/languageSlice';
import { useTranslation } from 'react-i18next';

const LanguageToggler = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.language);
  const { t } = useTranslation();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;

    dispatch(setLanguage(selectedLanguage));
  };

  return (
    <select
      className="language-toggler"
      name="language-toggler"
      onChange={onChange}
      value={language}
    >
      <option value="en">{t('languageToggler.en')}</option>
      <option value="ru">{t('languageToggler.ru')}</option>
    </select>
  );
};

export default LanguageToggler;
