import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  app_theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setAppTheme: (state, action) => {
      state.app_theme = action.payload;
    },
  },
});

export const {setAppTheme} = themeSlice.actions;

export default themeSlice.reducer;
