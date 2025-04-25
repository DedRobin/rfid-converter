import Converter from './components/Converter';
import LanguageToggler from './components/LanguageToggler';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import './App.css';
import Loader from './shared/UI/Loader';

function App() {
  const { language } = useSelector((state: RootState) => state.language);
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    i18n.changeLanguage(language);
    setIsLoading(false);
  }, [language, i18n]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Converter />
          <LanguageToggler />
        </>
      )}
    </>
  );
}

export default App;
