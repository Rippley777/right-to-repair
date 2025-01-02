import { createSlice } from "@reduxjs/toolkit";

export const featuresSlice = createSlice({
  name: "features",
  initialState: {
    search: false,
    headerGroups: false,
    editFilters: false,
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleSearch: (state) => {
      state.search = !state.search;
    },
    toggleHeaderGroups: (state) => {
      state.headerGroups = !state.headerGroups;
    },
    toggleEditFilters: (state) => {
      state.editFilters = !state.editFilters;
    },
  },
});

export const {
  setSearch,
  toggleSearch,
  toggleEditFilters,
  toggleHeaderGroups,
} = featuresSlice.actions;
export default featuresSlice.reducer;
