import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@/api";
import { Device } from "@/types";
import { setPageDataFromApi } from "./table/pages";

interface DevicesState {
  data: Device[];
  total: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
interface DeviceResponseAction {
  payload: DeviceResponse;
}

type DeviceResponse = {
  devices: Device[];
  total: number;
  page: number;
  pages: number;
};

const initialState: DevicesState = {
  data: [],
  total: 0,
  status: "idle",
  error: null,
};

export const fetchDevices = createAsyncThunk<
  DeviceResponse,
  unknown,
  { rejectValue: string }
>("devices/fetchDevices", async (_, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  try {
    const state = getState() as {
      table: {
        filters: { data: Record<string, string> };
        pages: { current: number };
      };
    };
    const { data } = state.table.filters;
    const { current } = state.table.pages;
    const queryParams = new URLSearchParams({
      ...data,
      page: current.toString(),
    });

    const response = await axios.get(
      `${API_URL}/api/devices/search?${queryParams.toString()}`
    );
    if (!response.data) {
      return thunkAPI.rejectWithValue("Failed to fetch devices");
    }
    if (response.data) {
      dispatch(setPageDataFromApi(response.data));
    }

    return response.data;
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
        (state, action: DeviceResponseAction) => {
          state.status = "succeeded";
          state.total = action.payload.total;
          // @ts-expect-error TODO actually learn TS and get fancy here with indexing
          state.data = action.payload.devices.map((device) => ({
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
