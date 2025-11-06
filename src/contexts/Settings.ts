import { createContext } from 'react';

import { SettingsContextProps } from './interfaces';

const SettingsContext = createContext<SettingsContextProps>({
  changeCopyAfterConvert: null,
});

export { SettingsContext };
