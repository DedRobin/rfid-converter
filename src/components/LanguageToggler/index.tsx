import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../store/slices/languageSlice';
import { RootState } from '../../store/store';
import { useEffect } from 'react';
import './style.css';

export default function LanguageToggler() {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.language);
  const { i18n } = useTranslation();

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;

    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  return (
    <select className="language-toggler" value={language} onChange={onChange}>
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  );
}
