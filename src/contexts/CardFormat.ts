import { CardFormatContextProps } from './interfaces';
import { createContext } from 'react';

const CardFormatContext = createContext<CardFormatContextProps>({
  handleCopy: null,
  values: {
    text: null,
    dex: null,
    hex: null,
  },
  currentCopiedType: null,
});

export default CardFormatContext;
