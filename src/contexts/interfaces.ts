import { NotifyType, PositionalNumeralSystem } from '@customTypes/App';
import { MouseEvent } from 'react';

interface ToastContextProps {
  notify: (msg: string, type?: NotifyType) => void;
}

interface CardFormatContextProps {
  className: string;
  handleCopy:
    | ((
        e: MouseEvent<HTMLDivElement>,
        value: string,
        positionalNumeralSystem: PositionalNumeralSystem | null
      ) => Promise<void>)
    | null;
  values: {
    text: string | null;
    dex: string | null;
    hex: string | null;
  };
  currentCopiedType: PositionalNumeralSystem | null;
}

export type { ToastContextProps, CardFormatContextProps };
