import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    data: [],
    total: 0,
    category: "",
    price_lt: null,
    page: 1,
    pageSize: 10,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setFilter: (state, action) => {
      console.log("setting filter: ", action.payload);
      console.log("state: ", state);

      // @ts-expect-error - TS doesn't like dynamic keys
      state[action.payload.key] = action.payload.value;
    },
    resetFilters: (state) => {
      state.category = "";
      state.price_lt = null;
      state.page = 1;
      state.pageSize = 10;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const { setFilter, resetFilters, setPage, setPageSize } =
  filtersSlice.actions;
export default filtersSlice.reducer;
