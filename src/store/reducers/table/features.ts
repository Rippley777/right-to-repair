import { createSlice } from "@reduxjs/toolkit";

export const featuresSlice = createSlice({
  name: "features",
  initialState: {
    search: false,
    headerGroups: false,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleSearch: (state) => {
      state.search = !state.search;
    },
  },
});

export const { setSearch, toggleSearch } = featuresSlice.actions;
export default featuresSlice.reducer;
