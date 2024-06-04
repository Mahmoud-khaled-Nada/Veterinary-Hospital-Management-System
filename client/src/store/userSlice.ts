import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthorizationToken, User, UserState } from "@/utils/types";
import { removeCookie, setCookie } from "@/utils/hook/useCookies";

const initialState: UserState = {
  user: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromLogin: (state, action: PayloadAction<AuthorizationToken>) => {
      const { access_token, expires_in, user } = action.payload;
      if (access_token) {
        removeCookie("access_token");
        state.user = user;
        setCookie("access_token", access_token, expires_in - 500);
      }
    },
    updateUserInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      removeCookie("access_token");
    },
  },
});

export const { setUserFromLogin, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
