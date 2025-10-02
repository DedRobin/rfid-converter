import { CardFormatContextProps } from './interfaces';
import { createContext } from 'react';


const CardFormatContext = createContext<CardFormatContextProps>({
  className: 'converter-output',
  handleCopy: null,
  values: {
    text: null,
    dex: null,
    hex: null,
  },
});

export default CardFormatContext;
