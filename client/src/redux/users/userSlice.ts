import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfileAPI } from "@/utils/apis";
import { AuthorizationToken, AuthUserState, UserDetails } from "@/utils/types";
import { removeCookie, setCookie } from "@/utils/hook/useCookies";

export const fetchAuthUserThunk = createAsyncThunk("fetch/auth/user", async () => {
  const response = await getUserProfileAPI();
  return response.data;
});

const initialState: AuthUserState = {
  user: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromRegister: (state, action: PayloadAction<UserDetails>) => {
      console.log(action.payload);
    },
    setUserFromLogin: (state, action: PayloadAction<AuthorizationToken>) => {
      const { access_token, expires_in } = action.payload.token.original;
      if (access_token) {
        removeCookie("access_token");
        state.user = action.payload.user;
        access_token ? setCookie("access_token", access_token, expires_in - 500) : null;
      }
    },
    logout: () => {},
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuthUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAuthUserThunk.rejected, (state) => {
        console.log("fetchAuthUserThunk.rejected");
        state.isLoading = false;
      });
  },
});

export const { setUserFromRegister, setUserFromLogin } = userSlice.actions;
export default userSlice.reducer;
