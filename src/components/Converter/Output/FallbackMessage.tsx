import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CardFormatContext } from './context';

const FallbackMessage = () => {
  const { className } = useContext(CardFormatContext);
  const { t } = useTranslation();

  return <div className={`${className}__fallback`}>{t('output.fallback')}</div>;
};

export default FallbackMessage;
