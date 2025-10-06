import './style.css';
import { FC, MouseEvent, useContext, useRef, useState } from 'react';
import {
  addCopiedStatus,
  copyToClipboard,
  disableCopiedStatus,
} from './services';
import CardFormatContext from '@contexts/CardFormat';
import type { ConverterOutputProps } from '@interfaces/Converter';
import DexValue from './values/DexValue';
import HexValue from './values/HexValue';
import { PositionalNumeralSystem } from '@customTypes/App';
import PromptMessage from './PromptMessage';
import TextValue from './values/TextValue';
import ToastContext from '@contexts/Toast';
import { useTranslation } from 'react-i18next';

const ConverterOutput: FC<ConverterOutputProps> = ({ text, dex, hex }) => {
  const className = 'converter-output';

  const { notify } = useContext(ToastContext);
  const { t } = useTranslation();

  const [currentCopiedType, setCUrrentCopiedType] =
    useState<PositionalNumeralSystem | null>(null);

  const copyTimerId = useRef<NodeJS.Timeout | null>(null);
  const currentValue = useRef<HTMLDivElement | null>(null);

  const handleCopy = async (
    e: MouseEvent<HTMLDivElement>,
    value: string,
    type: PositionalNumeralSystem | null
  ) => {
    const element = e.target;
    if (!(element instanceof HTMLDivElement)) return;

    try {
      await copyToClipboard(value);

      setCUrrentCopiedType(() => {
        if (copyTimerId.current) {
          clearTimeout(copyTimerId.current);

          if (currentValue.current) disableCopiedStatus(currentValue.current);
        }

        addCopiedStatus(element);
        currentValue.current = element;

        copyTimerId.current = setTimeout(() => {
          setCUrrentCopiedType(() => {
            disableCopiedStatus(element);
            return null;
          });
        }, 2000);

        return type;
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
        value={{
          className,
          handleCopy,
          values: { text, dex, hex },
          currentCopiedType,
        }}
      >
        <div className={`${className}__card-hole`} />
        <div className={`${className}__wrapper`}>
          <PromptMessage
            currentCopiedType={currentCopiedType}
            hasConvertedData={hasConvertedData}
          />
          <div className={`${className}__values`}>
            <HexValue />
            <DexValue />
            <TextValue />
          </div>
        </div>
      </CardFormatContext.Provider>
    </div>
  );
};

export default ConverterOutput;
