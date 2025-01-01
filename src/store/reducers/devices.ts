import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";
import { Device } from "../../types";
import { setPage, setPageSize } from "./table/filter";

interface DevicesState {
  data: Device[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DevicesState = {
  data: [],
  status: "idle",
  error: null,
};

export type FilterProps = {
  category?: string;
  price_lt?: number | string;
  page?: number;
  pageSize?: number;
};

export const fetchDevices = createAsyncThunk<
  void,
  FilterProps,
  { rejectValue: string }
>("devices/fetchDevices", async (_, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  try {
    const state = getState() as {
      table: { filters: FilterProps };
    };
    const { page, pageSize } = state.table.filters;

    const queryParams = new URLSearchParams({
      page: page?.toString() ?? "1",
      pageSize: pageSize?.toString() ?? "10",
    });

    const response = await axios.get(
      `${API_URL}/api/devices/search?${queryParams.toString()}`
    );
    if (response.data.page) {
      dispatch(setPage(response.data.page));
      dispatch(setPageSize(response.data.pageSize));
    }
    console.log("api response: ", response);

    return response.data.devices;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error fetching data"
      );
    }
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
});

const devicesSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDevices.fulfilled,
        (state, action: PayloadAction<Device[]>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(
        fetchDevices.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch devices";
        }
      );
  },
});

export default devicesSlice.reducer;
