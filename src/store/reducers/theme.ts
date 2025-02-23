import { createSlice } from '@reduxjs/toolkit';
import { selectedTheme } from '@ui';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: selectedTheme("dark"),
    themeName: 'dark',
  },
  reducers: {
    toggleTheme: (state) => {
      const updatedTheme = state.themeName === 'light' ? 'dark' : 'light'
      state.themeName = updatedTheme;
      state.theme = selectedTheme(updatedTheme);
    },
    setCustomTheme: (state, action) => {
      state.themeName = action.payload.themeName;
      state.theme = selectedTheme(action.payload.themeName);
    },
  },
});

export const { toggleTheme, setCustomTheme } = themeSlice.actions;
export default themeSlice.reducer;
