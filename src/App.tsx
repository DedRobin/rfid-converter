import Converter from './components/Converter';
import LanguageToggler from './components/LanguageToggler';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import './App.css';

function App() {
  const { language } = useSelector((state: RootState) => state.language);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <>
      <Converter />
      <LanguageToggler />
    </>
  );
}

export default App;
