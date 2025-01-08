import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: 1,
  total: 0,
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.current = action.payload;
    },
    setPageDataFromApi: (state, action) => {
      if (!action.payload) {
        return;
      }
      if (action.payload.total || action.payload.total === 0) {
        state.total = action.payload.pages;
      }
      if (action.payload.page || action.payload.page === 0) {
        state.current = action.payload.page;
      }
    },
  },
});

export const { setPage, setPageDataFromApi } = themeSlice.actions;
export default themeSlice.reducer;
