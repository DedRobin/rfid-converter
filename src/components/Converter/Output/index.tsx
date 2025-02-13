import { memo } from 'react';
import { ConverterOutputProps } from '../../../types/Converter';
import './style.css';

const ConverterOutput = memo(({ text, dex, hex }: ConverterOutputProps) => {
  const className = 'converter-output';
  return (
    <div className={className}>
      <div className={`${className}__text`}>Text: {text}</div>
      <div className={`${className}__dex`}>Dex: {dex}</div>
      <div className={`${className}__hex`}>Hex: {hex}</div>
    </div>
  );
});

export default ConverterOutput;
