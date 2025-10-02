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

  const initMsg = t('output.initMsg')
    .split('.')
    .map((stringPart, index) => <p key={index}>{stringPart}</p>);

  if (isCopied) {
    return (
      <div className={`${className}__prompt`}>
        <span>{t('output.isCopied')}</span>
      </div>
    );
  }

  return (
    <div className={`${className}__prompt`}>
      {hasConvertedData ? t('output.afterConvertMsg') : initMsg}
    </div>
  );
};

export default PromptMessage;
