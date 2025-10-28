import './App.css';
import { useEffect, useState } from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';
import Main from '@components/Main';
import ToastContext from '@contexts/Toast';
import { NotifyType } from '@customTypes/App';
import Loader from '@shared/UI/Loader';
import { RootState } from '@store/index';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ToastContainer, ToastOptions, toast } from 'react-toastify';

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
    void i18n.changeLanguage(language);
    setIsLoading(false);
  }, [language, i18n]);

  return (
    <ToastContext value={{ notify }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Main />
          <Footer />
        </>
      )}
      <ToastContainer />
    </ToastContext>
  );
};

export default App;
