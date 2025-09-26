import { createContext, MouseEvent } from 'react';

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

const CardFormatContext = createContext<CardFormatContextProps>({
  className: 'converter-output',
  handleCopy: null,
  values: {
    text: null,
    dex: null,
    hex: null,
  },
});

export { CardFormatContext };
