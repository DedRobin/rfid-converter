import { memo, MouseEvent } from 'react';
import type { ConverterOutputProps } from '@interfaces/Converter';

import { CardFormatContext } from './context';
import TextValue from './values/TextValue';
import DexValue from './values/DexValue';
import HexValue from './values/HexValue';
import PromptMessage from './PromptMessage';
import './style.css';

const ConverterOutput = memo(({ text, dex, hex }: ConverterOutputProps) => {
  const className = 'converter-output';

  const handleCopy = async (e: MouseEvent<HTMLDivElement>, value: string) => {
    const element = e.target;
    if (!(element instanceof HTMLDivElement)) return;

    try {
      await navigator.clipboard.writeText(value);
      element.classList.add('copied');
      setTimeout(() => element.classList.remove('copied'), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
              <PromptMessage hasConvertedData={hasConvertedData} />
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
