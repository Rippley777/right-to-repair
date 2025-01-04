import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/api";
import { buildTree, FilterTree, separateTopLevelTree } from "@/utils/dataUtils";

interface SetFilterAction {
  payload: {
    key: string;
    value: string | number;
  };
}
export const fetchFilterOptions = createAsyncThunk(
  "filters/fetchFilterOptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/devices/search/filters`);
      if (!response.data) {
        return rejectWithValue("Failed to fetch filter options");
      }

      if (response.data.filterKeys) {
        const tree = buildTree(response.data.filterKeys);
        const { topLevelNullValues, valueTree } = separateTopLevelTree(tree);

        return {
          ...response.data,
          filterTree: { device_details: topLevelNullValues, ...valueTree },
        };
      }

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
  filterTree?: FilterTree;
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
  filterTree: undefined,
  fetchingFilterOptions: false,
};
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state: FilterState, action: SetFilterAction) => {
      const { key, value } = action.payload;

      if (!Array.isArray(state.data[key])) {
        //@ts-expect-error TODO handle error
        state.data[key] = [];
      }
      if (
        Array.isArray(state.data[key]) &&
        !(state.data[key] as Array<string | number>).includes(value)
      ) {
        (state.data[key] as Array<string | number>).push(value);
      }
    },
    removeFilter: (state, action) => {
      const { key, value } = action.payload;
      if (Array.isArray(state.data[key])) {
        state.data[key] = (state.data[key] as Array<string | number>).filter(
          (v) => v !== value
        ) as unknown as string | number;
      }
    },
    setActiveSubfilter: (state, action) => {
      state.activeSubfilter = action.payload;
      state.activeSubfilterValues = state.filterValues[
        action.payload
      ] as string[];
    },
    resetFilters: (state) => {
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
        state.filterTree = action.payload.filterTree;
      })
      .addCase(fetchFilterOptions.rejected, (state, action) => {
        state.fetchingFilterOptions = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilter,
  removeFilter,
  setActiveSubfilter,
  resetFilters,
  setPage,
  setPageSize,
  resetFiltersByKeys,
  updateFilterHistory,
} = filtersSlice.actions;
export default filtersSlice.reducer;
