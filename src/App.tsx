import './App.css';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Converter from '@components/Converter';
import LanguageToggler from '@components/LanguageToggler';
import Loader from '@shared/UI/Loader';
import { NotifyType } from '@customTypes/App';
import { RootState } from '@store/index';
import ToastContext from '@contexts/Toast';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const App = () => {
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
