import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  UserActionPayload,
  ActivateUserPayload,
  setUserPayload,
} from "../../Utils/globalTypes";
import { AuthUserPayload, ACCESS_TOKEN_NAME } from "../../Utils";

type AuthStateType = {
  user: setUserPayload | null;
  authStatus: boolean;
};

const INITIAL_STATE: AuthStateType = {
  user: null,
  authStatus: !!localStorage.getItem(ACCESS_TOKEN_NAME), //тут мы проверяем - если токен есть - true, иначе false
};

// ! - первое "не" приводит сначала к булиновскому типу -> конвертирует в обратное ему
// !undefined -> !false -> true
// !!undefined -> !!false -> !true -> false

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    createNewUser: (state, action: PayloadAction<UserActionPayload>) => {},
    activateUser: (state, action: PayloadAction<ActivateUserPayload>) => {},
    authUser: (state, action: PayloadAction<AuthUserPayload>) => {},
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.authStatus = action.payload;
    },
    getUser: (state, action: PayloadAction<undefined>) => {},
    setUser: (state, action: PayloadAction<setUserPayload>) => {
      state.user = action.payload;
    },
    logoutUser: (state, action: PayloadAction<undefined>) => {},
  },
});

export const {
  createNewUser,
  activateUser,
  authUser,
  setAuthStatus,
  getUser,
  setUser,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
