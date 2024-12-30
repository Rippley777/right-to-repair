import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Device, PartialDeviceUpdate } from "../../types";
import { API_DEV_URL } from "../../api/";

interface SingleDeviceState {
  data: Device | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SingleDeviceState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchDeviceById = createAsyncThunk<
  Device,
  string,
  { rejectValue: string }
>("singleDevice/fetchDeviceById", async (id, thunkAPI) => {
  try {
    const response = await axios.get<Device>(
      `${API_DEV_URL}api/devices/id/${id}`
    ); // Replace with your endpoint
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching device"
      );
    }
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
});

export const updateDeviceById = createAsyncThunk<
  Device,
  { id: string; updates: PartialDeviceUpdate },
  { rejectValue: string }
>("singleDevice/updateDeviceById", async ({ id, updates }, thunkAPI) => {
  try {
    const response = await axios.patch<Device>(
      `/api/devices/id/${id}`,
      updates
    ); // Replace with your endpoint
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error updating device"
      );
    }
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
});

const deviceSlice = createSlice({
  name: "singleDevice",
  initialState,
  reducers: {
    clearDevice: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeviceById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchDeviceById.fulfilled,
        (state, action: PayloadAction<Device>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(
        fetchDeviceById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch device";
        }
      )
      .addCase(updateDeviceById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateDeviceById.fulfilled,
        (state, action: PayloadAction<Device>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(
        updateDeviceById.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to update device";
        }
      );
  },
});

export const { clearDevice } = deviceSlice.actions;

export default deviceSlice.reducer;
