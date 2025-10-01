import { memo, MouseEvent, useContext, useRef, useState } from 'react';
import type { ConverterOutputProps } from '@interfaces/Converter';

import { CardFormatContext } from './context';
import TextValue from './values/TextValue';
import DexValue from './values/DexValue';
import HexValue from './values/HexValue';
import PromptMessage from './PromptMessage';
import { ToastContext } from '@src/context';
import { useTranslation } from 'react-i18next';
import './style.css';

const ConverterOutput = memo(({ text, dex, hex }: ConverterOutputProps) => {
  const className = 'converter-output';

  const { notify } = useContext(ToastContext);
  const { t } = useTranslation();

  const [isCopied, setIsCopied] = useState(false);

  const copyTimerId = useRef<NodeJS.Timeout | null>(null);
  const currentValue = useRef<HTMLDivElement | null>(null);

  const handleCopy = async (e: MouseEvent<HTMLDivElement>, value: string) => {
    const element = e.target;
    if (!(element instanceof HTMLDivElement)) return;

    try {
      await navigator.clipboard.writeText(value);

      setIsCopied(() => {
        if (copyTimerId.current) {
          clearTimeout(copyTimerId.current);
          if (currentValue.current)
            currentValue.current.classList.remove('copied');
        }

        element.classList.add('copied');
        currentValue.current = element;

        copyTimerId.current = setTimeout(() => {
          setIsCopied(() => {
            element.classList.remove('copied');
            return false;
          });
        }, 2000);

        return true;
      });
    } catch (err) {
      notify(t('output.errors.failToCopy'), 'error');
      console.error(err);
    }
  };

  const hasConvertedData = !!(hex && dex && text);

  return (
    <div className={className}>
      <CardFormatContext.Provider
        value={{ className, handleCopy, values: { text, dex, hex } }}
      >
        <div className={`${className}__card-hole`}></div>
        <div className={`${className}__wrapper`}>
          {
            <>
              <PromptMessage
                hasConvertedData={hasConvertedData}
                isCopied={isCopied}
              />
              <div className={`${className}__values`}>
                <HexValue />
                <DexValue />
                <TextValue />
              </div>
            </>
          }
        </div>
      </CardFormatContext.Provider>
    </div>
  );
});

export default ConverterOutput;
