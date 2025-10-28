import { FC, MouseEvent, useContext, useRef, useState } from 'react';

import CardFormatContext from '@contexts/CardFormat';
import ToastContext from '@contexts/Toast';
import { PositionalNumeralSystem } from '@customTypes/App';
import type { ConverterOutputProps } from '@interfaces/Converter';
import Card from '@shared/UI/Card';
import { useTranslation } from 'react-i18next';

import Hint from './HintMessage';
import styles from './Output.module.css';
import {
  addCopiedStatus,
  copyToClipboard,
  disableCopiedStatus,
} from './services';
import DexValue from './values/DexValue';
import HexValue from './values/HexValue';
import TextValue from './values/TextValue';


const ConverterOutput: FC<ConverterOutputProps> = ({ text, dex, hex }) => {
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

  const cardFormatContextValue = {
    handleCopy,
    values: { text, dex, hex },
    currentCopiedType,
  };
  const hasConvertedData = !!(hex && dex && text);

  return (
    <CardFormatContext.Provider value={cardFormatContextValue}>
      <Card>
        <Hint
          currentCopiedType={currentCopiedType}
          hasConvertedData={hasConvertedData}
        />
        <div className={styles.values}>
          <HexValue />
          <DexValue />
          <TextValue />
        </div>
      </Card>
    </CardFormatContext.Provider>
  );
};

export default ConverterOutput;
