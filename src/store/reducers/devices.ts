import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_DEV_URL } from "../../api/";
import { Device } from "../../types";

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

// Async thunk for fetching device data
export const fetchDevices = createAsyncThunk<
  Device[],
  void,
  { rejectValue: string }
>("devices/fetchDevices", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_DEV_URL}api/devices/search`);
    console.log("api response: ", response);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error fetching data"
      );
    }
    // Fallback for other error types
    return thunkAPI.rejectWithValue("An unexpected error occurred");
  }
});

// Create the slice
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
