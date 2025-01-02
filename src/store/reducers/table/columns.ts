import { createSlice } from "@reduxjs/toolkit";

export const columnsSlice = createSlice({
  name: "columnsSlice",
  initialState: {
    visibilityStatus: {
      Year: true,
      Model: false,
      "Model Number": true,
      Brand: true,
      Type: true,
      Score: true,
      Difficulty: true,
      Memory: true,
      Processor: true,
      "GPU Model": true,
      "Battery Info": true,
      Tools: true,
    },
  },
  reducers: {
    // toggleTheme: (state) => {
    //   state.theme = state.theme === "light" ? "dark" : "light";
    // },
    // setCustomTheme: (state, action) => {
    //   state.theme = action.payload.theme;
    // },
  },
});

// export const { toggleTheme, setCustomTheme } = columnsSlice.actions;
export default columnsSlice.reducer;
