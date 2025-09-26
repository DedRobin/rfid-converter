import { memo, MouseEvent } from 'react';
import type { ConverterOutputProps } from '@interfaces/Converter';

import { CardFormatContext } from './context';
import TextValue from './values/TextValue';
import DexValue from './values/DexValue';
import HexValue from './values/HexValue';
import FallbackMessage from './FallbackMessage';
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

  const hasData = hex && dex && text;

  return (
    <div className={className}>
      <CardFormatContext.Provider
        value={{ className, handleCopy, values: { text, dex, hex } }}
      >
        <div className={`${className}__card-hole`}></div>
        <div className={`${className}__wrapper`}>
          {hasData ? (
            <>
              <HexValue />
              <DexValue />
              <TextValue />
            </>
          ) : (
            <FallbackMessage />
          )}
        </div>
      </CardFormatContext.Provider>
    </div>
  );
});

export default ConverterOutput;
