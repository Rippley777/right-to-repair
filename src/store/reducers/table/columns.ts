import { createSlice } from "@reduxjs/toolkit";

// async function loadUserFilters(userId: string, dispatch: any) {
//   const response = await fetch(`/api/users/${userId}/filters`);
//   const data = await response.json();
//   dispatch(setFilters(data.filters));
// }

// async function saveUserFilters(userId: string, filters: FilterState) {
//   await fetch(`/api/users/${userId}/filters`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ filters }),
//   });
// }

export const columnsSlice = createSlice({
  name: "columnsSlice",
  initialState: {
    visibilityStatus: {
      "Model Details": true,
      Repairability: true,
      "Model Identifier": true,
    },
  },
  reducers: {
    toggleVisibility: (state, action) => {
      const columnName = action.payload as keyof typeof state.visibilityStatus;
      if (columnName in state.visibilityStatus) {
        state.visibilityStatus[columnName] =
          !state.visibilityStatus[columnName];
      } else {
        state.visibilityStatus[columnName] = false;
      }
    },
  },
});

export const { toggleVisibility } = columnsSlice.actions;
export default columnsSlice.reducer;
