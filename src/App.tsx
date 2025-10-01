import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';

import Converter from '@components/Converter';
import { RootState } from '@store/index';
import LanguageToggler from '@components/LanguageToggler';
import Loader from '@shared/UI/Loader';
import { ToastContext } from './context';
import { NotifyType } from '@customTypes/App';
import './App.css';

function App() {
  const { language } = useSelector((state: RootState) => state.language);
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const notify = (msg: string, type?: NotifyType) => {
    const options: ToastOptions = {
      position: 'bottom-right',
    };

    switch (type) {
      case 'error':
        toast.error(msg, options);
        break;
      default:
        toast(msg, options);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(language);
    setIsLoading(false);
  }, [language, i18n]);

  return (
    <ToastContext value={{ notify }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Converter />
          <LanguageToggler />
        </>
      )}
      <ToastContainer />
    </ToastContext>
  );
}

export default App;
