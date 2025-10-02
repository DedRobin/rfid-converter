import CardFormatContext from '@contexts/CardFormat';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

const PromptMessage = ({
  hasConvertedData,
  isCopied,
}: {
  hasConvertedData: boolean;
  isCopied: boolean;
}) => {
  const { className } = useContext(CardFormatContext);
  const { t } = useTranslation();

  if (isCopied) {
    return (
      <div className={`${className}__prompt`}>
        <span>{t('output.isCopied')}</span>
      </div>
    );
  }

  return (
    <div className={`${className}__prompt`}>
      <span>
        {hasConvertedData ? t('output.afterConvertMsg') : t('output.initMasg')}
      </span>
    </div>
  );
};

export default PromptMessage;
