import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../store/slices/languageSlice';
import { RootState } from '../../store';
import './style.css';

export default function LanguageToggler() {
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
      value={language}
      onChange={onChange}
    >
      <option value="en">{t('languageToggler.en')}</option>
      <option value="ru">{t('languageToggler.ru')}</option>
    </select>
  );
}
