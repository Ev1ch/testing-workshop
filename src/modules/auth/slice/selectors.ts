import type { State } from "store/types";

export const selectUser = (state: State) => state.auth.user;