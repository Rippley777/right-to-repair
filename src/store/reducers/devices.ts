import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/api";
import { Device } from "@/types";
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

export const fetchDevices = createAsyncThunk<
  Device[],
  unknown,
  { rejectValue: string }
>("devices/fetchDevices", async (_, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  try {
    const state = getState() as {
      table: { filters: { data: Record<string, string> } };
    };
    const { data } = state.table.filters;

    const queryParams = new URLSearchParams({
      ...data,
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
          // @ts-expect-error TODO actually learn TS and get fancy here with indexing
          state.data = action.payload.map((device) => ({
            ...device,
            repairability_insights: {
              ...device.repairability_insights,
              tools_required: device.repairability_insights.tools_required.map(
                (tool) => tool as unknown
              ),
            },
          }));
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
