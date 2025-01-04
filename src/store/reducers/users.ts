import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { omit } from "@/utils/obj-helpers";

type UserData = {
  email?: string;
  username?: string;
  id?: string;
};

type UserState = {
  userData: UserData | null;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  userData: {},
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
    },
    setUserData: (state, action) => {
      const userData: UserData = {
        ...state.userData,
        email: action.payload.email,
      };
      state.userData = userData;
      state.isAuthenticated = true;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userData = {
        ...state.userData,
        id: action.payload,
      };
    },
    setUserProfileData: (state, action: PayloadAction<UserData>) => {
      const userProfileData: UserData = {
        ...state.userData,
        ...action.payload,
      };
      state.userData = userProfileData;
    },
  },
});

export const { setUserData, setUserId, setUserProfileData, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
