import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { CardFormatContext } from './context';

const PromptMessage = ({ hasConvertedData }: { hasConvertedData: boolean }) => {
  const { className } = useContext(CardFormatContext);
  const { t } = useTranslation();

  return (
    <div className={`${className}__prompt`}>
      <span>
        {hasConvertedData ? t('output.afterConvertMsg') : t('output.initMasg')}
      </span>
    </div>
  );
};

export default PromptMessage;
