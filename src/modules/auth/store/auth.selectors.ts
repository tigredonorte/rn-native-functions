import { AuthFullState, AuthStateName } from "./auth.state";

const getState = (state: AuthFullState) => state[AuthStateName];
export const getAuthStatus = (state: AuthFullState) => getState(state)?.status;
export const getAuthToken = (state: AuthFullState) => getState(state)?.token;