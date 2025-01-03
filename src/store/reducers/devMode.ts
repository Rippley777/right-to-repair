import { createSlice } from "@reduxjs/toolkit";

const isDevEnvironment = process.env.NODE_ENV === "development";

// state.ts
const initialState = {
  devMode: false,
  debugMode: false,
  user: null,
  settings: {
    theme: "light",
    notifications: true,
  },
  // Other default state
};

const devState = {
  devMode: true,
  debugMode: false,
  user: {
    id: "12345",
    name: "Dev Tester",
    email: "dev@test.com",
  },
  settings: {
    theme: "dark",
    notifications: false,
  },
  tasks: [
    { id: "task1", title: "Fix all bugs 🐛", completed: false },
    { id: "task2", title: "Refactor Redux state", completed: true },
  ],
};

const devModeSlice = createSlice({
  name: "devMode",
  initialState: { ...initialState },
  reducers: {
    enableDevMode(state) {
      if (!isDevEnvironment) return;
      state.devMode = true;
      Object.assign(state, devState);
    },
    disableDevMode(state) {
      if (!isDevEnvironment) return;
      state.devMode = false;
      Object.assign(state, initialState);
    },
    toggleDevMode(state) {
      if (!isDevEnvironment) return;
      state.devMode = !state.devMode;
      Object.assign(state, state.devMode ? devState : initialState);
    },
    toggleDebugMode(state) {
      if (!isDevEnvironment) return;
      state.debugMode = !state.debugMode;
    },
  },
});

export const { enableDevMode, disableDevMode, toggleDebugMode, toggleDevMode } =
  devModeSlice.actions;
export default devModeSlice.reducer;
