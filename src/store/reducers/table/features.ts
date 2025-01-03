import { createSlice } from "@reduxjs/toolkit";

export const featuresSlice = createSlice({
  name: "features",
  initialState: {
    search: false,
    headerGroups: false,
    editFilters: false,
    actionsExpanded: false,
    columnsExpanded: true,
    sortExpanded: false,
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
    toggleActionsExpanded: (state) => {
      state.actionsExpanded = !state.actionsExpanded;
    },
    toggleColumnsExpanded: (state) => {
      state.columnsExpanded = !state.columnsExpanded;
    },
    toggleSortExpanded: (state) => {
      state.sortExpanded = !state.sortExpanded;
    },
  },
});

export const {
  setSearch,
  toggleSearch,
  toggleEditFilters,
  toggleHeaderGroups,
  toggleActionsExpanded,
  toggleColumnsExpanded,
  toggleSortExpanded,
} = featuresSlice.actions;
export default featuresSlice.reducer;
