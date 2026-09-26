import { RootState } from '..';

const settingsSelector = (state: RootState) => state.settings;
const copyAfterConvertSelector = (state: RootState) => state.settings.copyAfterConvert;

export { settingsSelector, copyAfterConvertSelector };
