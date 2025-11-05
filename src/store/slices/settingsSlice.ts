import { SettingsState } from '@interfaces/Settings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SettingsState = {
  copyAfterConvert: null,
};

const languageSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCopyAfterConvert: (
      state,
      action: PayloadAction<SettingsState['copyAfterConvert']>
    ) => {
      state.copyAfterConvert = action.payload;
    },
  },
});

export const { setCopyAfterConvert } = languageSlice.actions;
export default languageSlice.reducer;
