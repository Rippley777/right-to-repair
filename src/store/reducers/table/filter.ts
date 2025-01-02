import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../api";

interface SetFilterAction {
  payload: {
    key: string;
    // key: string;
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

type FilterData = {
  [key: string]: string | number;
};
type FilterState = {
  data: FilterData;
  history: FilterData[]; // Adjust type if you know the structure of history items
  total: number;
  loading: boolean;
  error: string | null;
  activeSubfilter: string;
  activeSubfilterValues: string[];
  filterKeys: string[];
  filterValues: Record<string, unknown>;
  rangeKeys: string[];
  rangeValues: Record<string, unknown>;
  sortKeys: string[];
  sortValues: Record<string, unknown>;
  fetchingFilterOptions: boolean;
};

const initialState: FilterState = {
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
};
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state: FilterState, action: SetFilterAction) => {
      console.log("setting filter: ", action.payload);
      console.log("state: ", state);

      const { key, value } = action.payload;

      if (!Array.isArray(state.data[key])) {
        //@ts-expect-error TODO handle error
        state.data[key] = []; // Initialize as an empty array if it doesn't exist
      }

      // Add the value to the array only if it doesn't already exist
      if (
        Array.isArray(state.data[key]) &&
        !(state.data[key] as Array<string | number>).includes(value)
      ) {
        (state.data[key] as Array<string | number>).push(value);
      }
    },
    setActiveSubfilter: (state, action) => {
      state.activeSubfilter = action.payload;
      state.activeSubfilterValues = state.filterValues[
        action.payload
      ] as string[];
    },
    resetFilters: (state) => {
      // state.category = "";
      // state.price_lt = null;
      state.history.push(state.data);
      state.data = {
        page: 1,
        pageSize: 10,
      };
    },
    resetFiltersByKeys: (state, action) => {
      action.payload.forEach((key: string) => {
        // TODO research delete vs traditional state[key] = []
        delete state.data[key];
      });
    },
    //   action: { payload: { [key: string]: unknown } }
    updateFilterHistory: (state, action) => {
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
