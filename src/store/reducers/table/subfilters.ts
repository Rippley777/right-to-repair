import { createSlice } from "@reduxjs/toolkit";

type SubfilterStateProps = {
  activeSubfilters: string[];
};

const initialState: SubfilterStateProps = {
  activeSubfilters: ["device_details"],
};

export const subfiltersSlice = createSlice({
  name: "subfilter",
  initialState,
  reducers: {
    setActiveSubfilters: (state, action) => {
      state.activeSubfilters = action.payload;
    },
  },
});

export const { setActiveSubfilters } = subfiltersSlice.actions;
export default subfiltersSlice.reducer;
