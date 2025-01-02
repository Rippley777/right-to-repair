import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../api";
interface FiltersState {
  [key: string]: string[]; // Each key holds an array of values
}

interface SetFilterAction {
  payload: {
    key: string; // The filter key (e.g., 'brand', 'type')
    value: string | number; // The filter value
  };
}
export const fetchFilterOptions = createAsyncThunk(
  "filters/fetchFilterOptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/devices/search/filters`);
      return response.data;
    } catch (error: unknown) {
      if (!error || typeof error !== "object" || !("response" in error)) {
        rejectWithValue("Failed to fetch filter options");
      }
      return rejectWithValue(
        // @ts-expect-error TODO handle error
        error.response?.data.message || "Failed to fetch filter options"
      );
    }
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    data: {
      page: 1,
      pageSize: 10,
    },
    history: [],
    total: 0,
    loading: false,
    error: null as string | null,
    activeSubfilter: "",
    activeSubfilterValues: [] as string[],
    filterKeys: [] as string[],
    filterValues: {} as Record<string, unknown>,
    rangeKeys: [] as string[],
    rangeValues: {} as Record<string, unknown>,
    sortKeys: [] as string[],
    sortValues: {} as Record<string, unknown>,
    fetchingFilterOptions: false,
  },
  reducers: {
    setFilter: (state: FiltersState, action: SetFilterAction) => {
      console.log("setting filter: ", action.payload);
      console.log("state: ", state);
      const { key, value } = action.payload;

      // if (state.filterValues[key].length === 0) {
      //   delete state[key]; // Remove the key from the state
      // }

      // Ensure the key exists in the state and is an array
      if (!Array.isArray(state.data[key])) {
        state.data[key] = [];
      }

      // Check if the value already exists in the array
      const index = state.data[key].indexOf(`${value}`);
      if (index === -1) {
        // If not present, add the value
        state.data[key].push(`${value}`);
      } else {
        // If present, remove the value (toggle off)
        state.data[key].splice(index, 1);
      }
    },
    setActiveSubfilter: (state, action) => {
      state.activeSubfilter = action.payload;
      state.activeSubfilterValues = state.filterValues[action.payload];
    },
    resetFilters: (state) => {
      // state.category = "";
      // state.price_lt = null;
      state.data.page = 1;
      state.data.pageSize = 10;
    },
    resetFiltersByKeys: (state, action) => {
      action.payload.forEach((key: string) => {
        // TODO research delete vs traditional state[key] = []
        delete state[key];
      });
    },
    //   action: { payload: { [key: string]: unknown } }
    updateFilterHistory: (state, action) => {
      // @ts-expect-error - TODO fix this
      state.history.push(action.payload);
    },
    setPage: (state, action) => {
      state.data.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.data.pageSize = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterOptions.pending, (state) => {
        state.fetchingFilterOptions = true;
        state.error = null;
      })
      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
        state.fetchingFilterOptions = false;
        state.filterKeys = action.payload.filterKeys;
        state.filterValues = action.payload.filterValues;
        state.rangeKeys = action.payload.rangeKeys;
        state.rangeValues = action.payload.rangeValues;
        state.sortKeys = action.payload.sortKeys;
        state.sortValues = action.payload.sortValues;
      })
      .addCase(fetchFilterOptions.rejected, (state, action) => {
        state.fetchingFilterOptions = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilter,
  setActiveSubfilter,
  resetFilters,
  setPage,
  setPageSize,
  resetFiltersByKeys,
  updateFilterHistory,
} = filtersSlice.actions;
export default filtersSlice.reducer;
