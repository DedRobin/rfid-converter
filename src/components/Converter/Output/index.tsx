import { memo, useState } from 'react';
import { ConverterOutputProps } from '../../../interfaces/Converter';
import './style.css';

const ConverterOutput = memo(({ text, dex, hex }: ConverterOutputProps) => {
  const className = 'converter-output';

  const [copied, setCopied] = useState({ text: false, dex: false, hex: false });

  const handleCopy = async (value: string, type: 'text' | 'dex' | 'hex') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied((prev) => ({ ...prev, [type]: true }));
      setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={className}>
      <div className={`${className}__text`}>
        <div className={`${className}__text-label`}>Text</div>
        <div className={`${className}__text-value`}>{text}</div>
        <div
          className={`${className}__text--copied`}
          onClick={() => handleCopy(text, 'text')}
        >
          {copied.text ? '✅' : '📋'}
        </div>
      </div>
      <div className={`${className}__dex`}>
        <div className={`${className}__dex-label`}>Dex</div>
        <div className={`${className}__dex-value`}>{dex}</div>
        <div
          className={`${className}__dex--copied`}
          onClick={() => handleCopy(dex, 'dex')}
        >
          {copied.dex ? '✅' : '📋'}
        </div>
      </div>
      <div className={`${className}__hex`}>
        <div className={`${className}__hex-label`}>Hex</div>
        <div className={`${className}__hex-value`}>{hex}</div>
        <div
          className={`${className}__hex--copied`}
          onClick={() => handleCopy(hex, 'hex')}
        >
          {copied.hex ? '✅' : '📋'}
        </div>
      </div>
    </div>
  );
});

export default ConverterOutput;
