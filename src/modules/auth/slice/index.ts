import {
  type PayloadAction,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import type { ThunkApiConfig } from "store/types";

import type { User } from "../types";
import type { SignInData } from "../contracts";
import initialState from "./state";

const name = "auth";

export const signIn = createAsyncThunk<User, SignInData, ThunkApiConfig>(
  `${name}/signIn`,
  (data) =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ firstName: "", lastName: "" }), 1000);
    })
);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

const { reducer, actions } = slice;
export const { setUser } = actions;
export * from "./selectors";
export default reducer;
