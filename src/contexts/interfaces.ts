import { MouseEvent } from 'react';
import { NotifyType } from '@customTypes/App';

interface ToastContextProps {
  notify: (msg: string, type?: NotifyType) => void;
}

interface CardFormatContextProps {
  className: string;
  handleCopy:
    | ((e: MouseEvent<HTMLDivElement>, value: string) => Promise<void>)
    | null;
  values: {
    text: string | null;
    dex: string | null;
    hex: string | null;
  };
}

export type { ToastContextProps, CardFormatContextProps };
