import { MouseEvent } from 'react';

import { NotifyType, PositionalNumeralSystem } from '@customTypes/App';

interface ToastContextProps {
  notify: (msg: string, type?: NotifyType) => void;
}

interface CardFormatContextProps {
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
