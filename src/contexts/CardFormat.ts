import { createContext } from 'react';

import { CardFormatContextProps } from './interfaces';

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
