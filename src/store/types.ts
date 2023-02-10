import { makeStore } from './index'

export type Store = ReturnType<typeof makeStore>;

export type State = ReturnType<Store['getState']>;

export type Dispatch = Store['dispatch'];

export interface ThunkApiConfig {
  state: State;
  dispatch: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
}