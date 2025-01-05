import { createSlice } from "@reduxjs/toolkit";

type SubfilterStateProps = {
  activeSubfilters: string[];
};

const initialState: SubfilterStateProps = {
  activeSubfilters: [""],
};

export const subfiltersSlice = createSlice({
  name: "subfilter",
  initialState,
  reducers: {
    setActiveSubfilters: (state, action) => {
      console.log("setActiveSubfilter1", action.payload);
      console.log("setActiveSubfilter2", state.activeSubfilters);
      //   state.activePrimarySubfilters = action.payload;
      //   state.activeSecondarySubfilters = action.payload;
      state.activeSubfilters = action.payload;
      //
    },
  },
});

export const { setActiveSubfilters } = subfiltersSlice.actions;
export default subfiltersSlice.reducer;
